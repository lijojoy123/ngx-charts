import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter,
  TemplateRef
} from '@angular/core';
import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[ngx-charts-bar-template]',
  template: `
  <svg:g class="foreign-object" [attr.transform]="transform">
      <foreignObject width="100" height="60">
          <ng-template [ngTemplateOutlet]="barTemplate" [ngTemplateOutletContext]="{ model: barTemplateValue }"> </ng-template>
        </foreignObject>
  </svg:g>
  `,
  styleUrls: ['./bar-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarTemplateComponent implements OnChanges {
  @Input() value;
  @Input() valueFormatting: any;
  @Input() barX;
  @Input() barY;
  @Input() barWidth;
  @Input() barHeight;
  @Input() orientation;
  @Input() barTemplate : TemplateRef<any>;
  @Input() barTemplateValue: any;

  @Output() dimensionsChanged: EventEmitter<any> = new EventEmitter();

  element: any;
  x: number;
  y: number;
  horizontalPadding: number = 2;
  verticalPadding: number = 5;
  formatedValue: string;
  transform: string;
  textAnchor: string;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getSize(): any {
    const h = this.element.getBoundingClientRect().height;
    const w = this.element.getBoundingClientRect().width;
    return { height: h, width: w };
  }

  ngAfterViewInit() {
    this.dimensionsChanged.emit(this.getSize());
  }

  update(): void {
      this.x = this.barX;
      this.y = this.barY + (this.barHeight - 60);
      this.transform = 'translate(' + this.x+ ',' + this.y + ')';
    
  }
}
