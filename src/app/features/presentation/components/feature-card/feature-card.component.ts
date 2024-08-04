import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [MatCardModule, NgClass, NgStyle, RouterLink, MatIcon],
  template: `
    <mat-card
      [ngClass]="{
        'opacity-50 cursor-not-allowed shadow-none': disabled === true,
        'opacity-100 hover:shadow-sm hover:cursor-pointer': disabled === false,
      }"
      class="w-auto sm:w-[400px] rounded-e-xl dark:bg-neutral-900 bg-neutral-100 overflow-y-auto overflow-x-hidden">
      <div
        [ngClass]="{ 'cursor-not-allowed': disabled === true }"
        [routerLink]="disabled ? '/home/presentation/features' : router"
        class="border-l-8 {{ borderColor }}">
        <mat-card-header>
          <mat-card-title-group>
            <mat-card-title
              class="text-md font-medium text-gray-900 dark:text-white"
              >{{ title }}</mat-card-title
            >
            <mat-icon facNavigationItemIcon class="font-icon">{{
              icon
            }}</mat-icon>
          </mat-card-title-group>
        </mat-card-header>
        <mat-card-content>
          <p class="tracking-tighter text-gray-500 text-sm dark:text-gray-400">
            {{ content }}
          </p>
        </mat-card-content>
      </div>
    </mat-card>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCardComponent {
  @Input()
  public title!: string;

  @Input()
  public content!: string;

  @Input()
  public icon!: string;

  @Input()
  public borderColor!: string;

  @Input()
  public disabled!: boolean;

  @Input()
  public router!: string;
}
