declare module com.hydrotik.elasticlists {
    class App {
        private view;
        /**
        *   Application Facade
        *
        *   @param {HTMLElement} view target
        */
        constructor(view: HTMLElement);
        private log(message);
        initializeApplication(message: string): void;
    }
}
