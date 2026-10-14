import {

    Component

} from '@angular/core';

import {

    CommonModule

} from '@angular/common';

import {

    ServiceFormComponent

} from '../../components/service-form/service-form.component';

@Component({

    selector:'app-services-page',

    standalone:true,

    imports:[

        CommonModule,

        ServiceFormComponent

    ],

    templateUrl:'./services-page.component.html',

    styleUrls:[

        './services-page.component.css'

    ]

})

export class ServicesPageComponent{

}