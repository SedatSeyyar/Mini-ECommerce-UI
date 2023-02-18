import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {  }

  private _spinnerType: SpinnerType = SpinnerType.LoadingSpinner;;
  public get spinnerType(): SpinnerType {
    return this._spinnerType;
  }
  public set spinnerType(v: SpinnerType) {
    this._spinnerType = v;
  }

  showSpinner() {
    this.spinner.show(this._spinnerType);
  }

  hideSpinner() {
    this.spinner.hide(this._spinnerType);
  }

  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.showSpinner();
  // }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   this.hideSpinner();
  // }
}

export enum SpinnerType {
  CorsSpinner = "spinnerCors",
  LoadingSpinner = "spinnerLoading"
} 