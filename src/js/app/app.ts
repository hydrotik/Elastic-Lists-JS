///<reference path='TestModule.ts' />


module com.hydrotik.elasticlists {

    import TestModule = com.hydrotik.elasticlists.TestModule;

    export class App {

        private view: HTMLElement;


        /**
        *   Application Facade
        *   
        *   @param {HTMLElement} view target container
        */
        constructor(view: HTMLElement) {
            this.view = view;

            this.log('Initializing Application from ' + this.view);
        }

        private log(message: string): void {
            console.log(message);
        }

        initializeApplication(message:string): void {
            this.log(message);

            var tm:TestModule = new TestModule('my URL');

        }
    }
}