import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { AppType } from 'src/app/types/apps_type';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-my-apps',
  templateUrl: './my-apps.component.html',
  styleUrls: ['./my-apps.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class MyAppsComponent implements OnInit {


  _mApps : AppType[] = [
   {
     "id": "5134",
     "name": "Cycle Lins",
     "image": "assets/img/apps/CycleLins.png",
     "link": "https://cycle-lins.vercel.app/pagina-inicial",
     "tab": "Web",
     "caption": "Angular",
     "isFull": false,
     "background":"#BD0000"
   },
   {
     "id": "5135",
     "name": "Studio C&R",
     "image": "assets/img/apps/Studiococer.png",
     "link": "https://studio-ce-r.vercel.app/home",
     "tab": "Web",
     "caption": "Angular",
     "isFull": false,
     "background":"#FC99C8"
   },
   {
     "id": "5136",
     "name": "Meu Portifolio React",
     "image": "assets/img/apps/Myport.png",
     "link": "https://meu-portifolio-wheat.vercel.app/",
     "tab": "Web",
     "caption": "React",
     "isFull": true,
     "background":"#960FFF"
   },
   {
     "id": "5137",
     "name": "Money E.S",
     "image": "assets/img/apps/MoneyE.S.png",
     "link": "https://money-e-s.vercel.app/",
     "tab": "Web",
     "caption": "React",
     "isFull": false,
     "background":"#6B00A1"
   },
   {
     "id": "5138",
     "name": "Buscador de CEP",
     "image": "assets/img/apps/SearchCEP.png",
     "link": "https://buscador-de-cep-kohl.vercel.app/",
     "tab": "Web",
     "caption": "React",
     "isFull": false,
     "background":"#CDCDCD"
   },

  ];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false
  _mTriggerAnim?= 'false'
  _mThreshold = 0.4

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {

      if (this.mOnceAnimated) {
        return;
      }
      if (val) {
        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
    }
    )
  }
}
