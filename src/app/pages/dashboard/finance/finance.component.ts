import { Component } from '@angular/core';
import { AvgClickRateWidgetComponent } from '@shared/widgets/avg-click-rate-widget/avg-click-rate-widget.component';
import { AvgOpenRateWidgetComponent } from '@shared/widgets/avg-open-rate-widget/avg-open-rate-widget.component';
import { EventsWidgetComponent } from '@shared/widgets/events-widget/events-widget.component';
import {
  TasksInProgressWidgetComponent
} from '@shared/widgets/tasks-in-progress-widget/tasks-in-progress-widget.component';
import { TeamWidgetComponent } from '@shared/widgets/team-widget/team-widget.component';
import { TodosWidgetComponent } from '@shared/widgets/todos-widget/todos-widget.component';
import { TotalProjectsWidgetComponent } from '@shared/widgets/total-projects-widget/total-projects-widget.component';
import {
  TotalSubscribersWidgetComponent
} from '@shared/widgets/total-subscribers-widget/total-subscribers-widget.component';
import { TotalTasksWidgetComponent } from '@shared/widgets/total-tasks-widget/total-tasks-widget.component';
import { UniqueVisitorsWidgetComponent } from '@shared/widgets/unique-visitors-widget/unique-visitors-widget.component';
import { DecimalPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IconComponent } from '@elementar/components';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import {
  Transaction,
  TransactionsWidgetComponent
} from '@shared/widgets/transactions-widget/transactions-widget.component';

@Component({
  standalone: true,
  imports: [
    AvgClickRateWidgetComponent,
    AvgOpenRateWidgetComponent,
    EventsWidgetComponent,
    TasksInProgressWidgetComponent,
    TeamWidgetComponent,
    TodosWidgetComponent,
    TotalProjectsWidgetComponent,
    TotalSubscribersWidgetComponent,
    TotalTasksWidgetComponent,
    UniqueVisitorsWidgetComponent,
    DecimalPipe,
    MatButton,
    MatIcon,
    IconComponent,
    MatRipple,
    RouterLink,
    TransactionsWidgetComponent
  ],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {
  totalBalance = 2136;
  currencyCode = 'usd';
  transactions: Transaction[] = [
    {
      createdAt: '14 Feb',
      status: 'approved',
      to: {
        amount: 129.81,
        currency: 'GPB'
      },
      from: {
        amount: 50,
        currency: 'USD'
      },
      sender: {
        id: 1,
        name: 'Lucas Peixoto'
      },
      recipient: {
        id: 1,
        name: 'Lucas Peixoto'
      }
    },
    {
      createdAt: '14 Feb',
      status: 'cancelled',
      to: {
        amount: 129.81,
        currency: 'GPB'
      },
      from: {
        amount: 50,
        currency: 'USD'
      },
      sender: {
        id: 1,
        name: 'Lucas Peixoto'
      },
      recipient: {
        id: 1,
        name: 'Lucas Peixoto'
      }
    },
    {
      createdAt: '12 Feb',
      status: 'cancelled',
      to: {
        amount: 100.02,
        currency: 'GPB'
      },
      from: {
        amount: 44,
        currency: 'USD'
      },
      sender: {
        id: 1,
        name: 'Lucas Peixoto'
      },
      recipient: {
        id: 1,
        name: 'Lucas Peixoto'
      }
    },
    {
      createdAt: '12 Feb',
      status: 'approved',
      to: {
        amount: 155.81,
        currency: 'GPB'
      },
      from: {
        amount: 55,
        currency: 'USD'
      },
      sender: {
        id: 1,
        name: 'Lucas Peixoto'
      },
      recipient: {
        id: 1,
        name: 'Lucas Peixoto'
      }
    },
  ];
  protected readonly screen = screen;
}
