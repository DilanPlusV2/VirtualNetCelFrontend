import {

    Component

} from '@angular/core';

import {

    CommonModule

} from '@angular/common';

import {

    ServiceFormComponent

} from './components/service-form/service-form.component';

@Component({

    standalone:true,

    selector:'app-services',

    imports:[

        CommonModule,

        ServiceFormComponent

    ],

    templateUrl:'./services.component.html',

    styleUrls:[

        './services.component.css'

    ]

})

export class ServicesComponent{

}