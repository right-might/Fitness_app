import { Routes } from '@angular/router'
import { RegistrationPageComponent } from './user/registration/registration-page/registration-page/registration-page.component'
import { LoginPageComponent } from './user/login/login-page/login-page.component'
import { ActivityPageComponent } from './activity/activity-page/activity-page.component'
import { WeekSummaryComponent } from './statistics/summary/week-summary/week-summary.component'
import { ActivityListComponent } from './activity/activity-list/activity-list.component'
import { WelcomePageComponent } from './user/welcome-page/welcome-page.component'
import { UserProfilComponent } from './user/profil/user-profil/user-profil.component'
import { TrainerListComponent } from './user/profil/trainer-list/trainer-list.component'
import { TrainersRequestComponent } from './user/admin/trainers-request/trainers-request.component'
import { PagePrincipaleHoteComponent } from './statistics/page-principale/page-principale-hote/page-principale-hote.component'
import { SummaryComponent } from './statistics/summary/summary-host/summary.component'
import { DailyStatsComponent } from './statistics/daily-stats-page/daily-stats-host/daily-stats.component'
import { PageDactiviteScrolldownmenuComponent } from './statistics/page-dactivite-scrolldownmenu/page-dactivite-scrolldownmenu.component'
import { DashboardComponent } from './statistics/dashboard/dashboard.component'
import { AdminPageComponent } from './user/admin/admin-page/admin-page.component'
import { UsersListComponent } from './user/admin/users-list/users-list.component'

import { FormulairePageComponent } from './user/formulaire/formulaire-page/formulaire-page.component'
import { TotalTrainersRequestComponent } from './user/admin/total-trainers-request/total-trainers-request.component'
import { TrainersListComponent } from './user/admin/trainers-list/trainers-list.component'
import { ParameterPageComponent } from './user/parameter/parameter-page/parameter-page.component'
import { ModifyParameterComponent } from './user/parameter/modify-parameter/modify-parameter.component'
import { MessagesComponent } from './user/admin/messages/messages.component'
import { LoginAdminPageComponent } from './user/admin/login/login-page/login-page.component'
import { AdminGuard } from './user/admin/admin.guard'
import { ActivityConfirmComponent } from './activity/activity-view/activity-view.component'
import { ActivityMapComponent } from './activity/activity-map/activity-map.component'
import { SecurityPageComponent } from './user/registration/security-page/security-page.component'
import { SecurityQuestionPageComponent } from './user/password_forgotten/security-question-page/security-question-page.component'
import { ResetPasswordPageComponent } from './user/password_forgotten/reset-password-page/reset-password-page.component'
import { ConfirmationPageComponent } from './user/confirmation/confirmation-page/confirmation-page.component'
import { ConfirmationModificationPageComponent } from './user/confirmation-modification/confirmation-modification-page/confirmation-modification-page.component'
import { PublicProfilComponent } from './user/public-profil/public-profil/public-profil.component'

export const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent,
    },

    {
        path: 'statistics/daily-stats',
        component: DailyStatsComponent,
    },
    {
        path: 'statistics/summary',
        component: SummaryComponent,
    },
    {
        path: 'page-principale',
        component: PagePrincipaleHoteComponent,
    },
    {
        path: 'page-principale/PageActiviter',
        component: PageDactiviteScrolldownmenuComponent,
    },
    {
        path: 'page-principale/dashboard',
        component: DashboardComponent,
    },

    {
        path: 'activities',
        component: ActivityListComponent,
    },
    {
        path: 'activity',
        component: ActivityPageComponent,
    },
    {
        path: 'activity-confirm',
        component: ActivityConfirmComponent,
    },

    {
        path: 'user/register',
        component: RegistrationPageComponent,
    },
    {
        path: 'auth/login',
        component: LoginPageComponent,
    },
    {
        path: 'user/profile',
        component: UserProfilComponent,
    },
    {
        path: 'trainers',
        component: TrainerListComponent,
    },
    { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
    { path: 'admin/login', component: LoginAdminPageComponent },
    {
        path: 'admin/view-users',
        component: UsersListComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'admin/view-trainers',
        component: TrainersListComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'admin/view-messages',
        component: MessagesComponent,
        canActivate: [AdminGuard],
    },

    {
        path: 'admin/view-trainers-request',
        component: TrainersRequestComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'user/profile/message',
        component: FormulairePageComponent,
    },
    {
        path: 'user/profile/parameter',
        component: ParameterPageComponent,
    },
    {
        path: 'user/profile/parameter/modify',
        component: ModifyParameterComponent,
    },
    {
        path: 'user/register/security_questions',
        component: SecurityPageComponent,
    },
    {
        path: ':username',
        component: PublicProfilComponent,
    },
    {
        path: 'auth/login/resetpassword',
        component: SecurityQuestionPageComponent,
    },
    {
        path: 'map/:id',
        component: ActivityMapComponent,
    },
    {
        path: 'user/register/reset_password',
        component: ResetPasswordPageComponent,
    },
    {
        path: 'user/register/confirmation',
        component: ConfirmationPageComponent,
    },
    {
        path: 'user/register/confirmation-modification',
        component: ConfirmationModificationPageComponent,
    },
]
