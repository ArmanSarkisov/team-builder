// class -> images -> Aharon -> jpg png jpeg -> webp
// class -> other -> Aharon
// class -> xmlrequest -> Lilit
// class -> link -> Rob
// class -> css -> Rob
// {
// useWebP: true || false
// isCache: true || false
// loadTime: 1
// }

window.requestIdleCallback = window.requestIdleCallback || function (handler) {
    let startTime = Date.now();

    return setTimeout(function () {
        handler({
            didTimeout: false,
            timeRemaining: function () {
                return Math.max(0, 50.0 - (Date.now() - startTime));
            }
        });
    }, 1);
}

const submitDomInfo = (data) => {
    if (data && data.length) {
        const body = data.map(item => JSON.stringify(item));
        requestIdleCallback(() => {
            fetch('https://web-monitoring-cba12.firebaseio.com/domInfo.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
        })
    }
}

const submitResourceInfo = (data) => {
    if (data && data.length) {
        const body = data.map(item => JSON.stringify(item));
        requestIdleCallback(() => {
            fetch('https://web-monitoring-cba12.firebaseio.com/resourceInfo.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body
            })
        })
    }
}

const imagesProcessing = images => {
    return images.map(item => {
        const obj = {
            isCached: item.transferSize === 0,
            needToChangeImgFormat: !/.*\.(webp+|svg+|gif+)/ig.test(item.name),
        };

        for (let key in item) {
            obj[key] = item[key];
        }

        return obj;
    })
};


const othersProcessing = others => {
    return others.map(item => {
        const obj = {
            isCached: item.transferSize === 0,

        }
        for (let key in item) {
            obj[key] = item[key];
        }

        return obj;
    })
}

const requestProcessing = (arr) => {
    return arr.map(style => {
        const obj = {
            date: Date.now()
        };

        for (let key in style) {
            obj[key] = style[key];
        }

        return obj;
    })
};

//UGLY: normala es 3 function-nery?
const cssProcessing = styles => {
    return styles.map(style => {
        const obj = {
            isCached: style.transferSize === 0,
            isMinified: style.name.includes(".min"),
        };

        for (let key in style) {
            obj[key] = style[key];
        }

        return obj;
    })
};

const linkProcessing = links => {
    return links.map(link => {
        const obj = {
            isCached: link.transferSize === 0,
            isMinified: link.name.includes(".min"),
        };

        for (let key in link) {
            obj[key] = link[key];
        }

        return obj;
    })
};

const scriptProcessing = scripts => {
    return scripts.map(script => {
        const obj = {
            isCached: script.transferSize === 0,
            isMinified: script.name.includes(".min"),
        };

        for (let key in script) {
            obj[key] = script[key];
        }

        return obj;
    })
};

const resourceProcessing = (arr) => {

    return [
        ...requestProcessing(arr.filter(item => item.initiatorType === 'xmlhttprequest')),
        ...imagesProcessing(arr.filter(item => item.initiatorType === 'img')),
        ...cssProcessing(arr.filter(item => item.initiatorType === 'css')),
        ...linkProcessing(arr.filter(item => item.initiatorType === 'link')),
        ...scriptProcessing(arr.filter(item => item.initiatorType === 'script')),
        ...othersProcessing(arr.filter(item => item.initiatorType === 'other'))
    ];
};

const navigationProcessing = (arr) => {
    console.log(arr);
    return arr.map(item => {
        const obj = {
            domContentLoaded: item.domContentLoadedEventEnd - item.domContentLoadedEventStart,
            date: Date.now(),
            connectEnd: item.connectEnd,
            connectStart: item.connectStart,
            decodedBodySize: item.decodedBodySize,
            domComplete: item.domComplete,
            domContentLoadedEventEnd: item.domContentLoadedEventEnd,
            domContentLoadedEventStart: item.domContentLoadedEventStart,
            domInteractive: item.domInteractive,
            domainLookupEnd: item.domainLookupEnd,
            domainLookupStart: item.domainLookupStart,
            duration: item.duration,
            encodedBodySize: item.encodedBodySize,
            entryType: item.entryType,
            fetchStart: item.fetchStart,
            initiatorType: item.initiatorType,
            loadEventEnd: item.loadEventEnd,
            loadEventStart: item.loadEventStart,
            name: item.name,
            nextHopProtocol: item.nextHopProtocol,
            redirectCount: item.redirectCount,
            redirectEnd: item.redirectEnd,
            redirectStart: item.redirectStart,
            requestStart: item.requestStart,
            responseEnd: item.responseEnd,
            responseStart: item.responseStart,
            secureConnectionStart: item.secureConnectionStart,
            serverTiming: item.serverTiming,
            startTime: item.startTime,
            transferSize: item.transferSize,
            type: item.type,
            unloadEventEnd: item.unloadEventEnd,
            unloadEventStart: item.unloadEventStart,
            workerStart: item.workerStart
        };

        return obj;
    })
};

const po = new PerformanceObserver((list) => {
    const dom = navigationProcessing(list.getEntries().filter(item => item instanceof PerformanceNavigationTiming));
    const resources = resourceProcessing(list.getEntries().filter(item => item instanceof PerformanceResourceTiming));

    submitDomInfo(dom);
    submitResourceInfo(resources);
});

po.observe({ entryTypes: ['resource', 'navigation'], buffered: true });










/* DONT DELETE IT WORKED

class CheckUsingBadMethods {

    static evalCount = 0;
    static checkDocWriteCount = 0;

    static checkUsingDocumentWrite() {
        if (document) {
            const write = document.write;
            let usingDocWriteCount = 0;
            document.write = (params) => {
                usingDocWriteCount++;
                CheckUsingBadMethods.checkDocWriteCount += usingDocWriteCount;
                write.call(document, params);
            };
        }
    }

    static checkUsingEval() {
        if (window) {
            const evaluate = window.eval;
            let usingEvalCount = 0;
            window.eval = (params) => {
                usingEvalCount++;
                CheckUsingBadMethods.evalCount += usingEvalCount;
                evaluate.call(window, params);
            };
        }
    }
}

window.CheckUsingBadMethods = CheckUsingBadMethods;
CheckUsingBadMethods.checkUsingEval();
CheckUsingBadMethods.checkUsingDocumentWrite();
Navigation.isPageCached();

*/


/* fetch maybe is ready
function fetching(data, endpoint) {
    fetch(`url/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

function fetchImgs(cache) {
    fetching(cache, '/imgs');
}
function fetchNavTiming(cache) {
    fetching(cache, '/imgs');
}

 */


/** DO NOT DELETE!!!!!!!!!! */

//for finding the image element from the source
// Array.from(document.getElementsByTagName('img')).filter(i => i.src=='https://www.nicepng.com/png/detail/503-5032252_shamim-amiri-blank-female-avatar-icon.png')
// requestIdleCallback( Resource.RequestTiming(), { timeout: 2000 });
/** DO NOT DELETE!!!!!!!!!! */
