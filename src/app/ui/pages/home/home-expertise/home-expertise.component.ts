import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

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

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

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

  _mTools = [
    {
      "id": "5131",
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design",
      "color": "#ED433A"
    },
    {
      "id": "8103",
      "name": "WebComponents",
      "logo": "assets/img/tools/web-component-logo.png",
      "link": "https://www.webcomponents.org/",
      "tab": "web",
      "color":"#00B0FF"
    },
    {
      "id": "8105",
      "name": "HighCharts js",
      "logo": "assets/img/tools/highchart-logo.png",
      "link": "https://www.highcharts.com/",
      "tab": "web",
      "color":"#00E3AC"
    },
    {
      "id": "8108",
      "name": "Sass",
      "logo": "assets/img/tools/sass-logo.svg",
      "link": "https://sass-lang.com/",
      "tab": "web",
      "color": "#CF649A"
    },
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF0D00"
    },
    {
      "id": "8102",
      "name": "React",
      "logo": "assets/img/tools/react.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#00CAFF"
    },
    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end",
      "color":"#2CC000"
    },
    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud",
      "color":"#FF9E00"
    },
    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud",
      "color":"#0081FF"
    },
    {
      "id": "6124",
      "name": "C#",
      "logo": "assets/img/tools/csharp.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud",
      "color":"#6700B2"
    },
    {
      "id": "6125",
      "name": ".NET",
      "logo": "assets/img/tools/net.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud",
      "color": "#BA00FF"
    },
  ]

}
