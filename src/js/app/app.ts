
module com.hydrotik.elasticlists {

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
        }
    }
}