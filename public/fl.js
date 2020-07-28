class Monitoring {
    static getEntriesByType(type) {
        if (typeof window !== 'undefined') {
            return window.performance.getEntriesByType(type);
        }
        return null;
    }
}

class Navigation {
    static getNavigationPerformance() {
        return Monitoring.getEntriesByType('navigation');
    }

    static DOMContentLoadedTiming() {
        Navigation.getNavigationPerformance()
            .forEach(item => {
                // console.log(item);
                // TODO: get dom content loaded time, you need item.domContentLoadedEventEnd and item.domContentLoadedEventStart
                setTimeout(() => {
                    console.log('dom content loaded', item.domContentLoadedEventEnd, item.domContentLoadedEventStart);
                }, 0);
            });
    }

    static DOMCompleteTiming() {
        Navigation.getNavigationPerformance()
            .forEach(item => {
                console.log(item);
                // TODO: get Dom complete timing
                setTimeout(() => {
                    console.log('DOM complete = ' + item.domComplete);
                }, 1000);
            });
    }
}


// TODO: need ms to sec function;

// const po = new PerformanceObserver((list) => {
//     for (const entry of list.getEntries()) {
//         console.log('Server Timing', entry);
//     }
// });
// po.observe({ type: 'beacon', buffered: true });

// const perfData = window.performance.timing;
// const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
// console.log(pageLoadTime);

// classes methods execute
// Navigation.DOMContentLoadedTiming();
Navigation.DOMCompleteTiming();

