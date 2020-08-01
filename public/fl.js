class Request {
    static postRequest(data) {
        if (data && data.length) {
            requestIdleCallback(() => {
                fetch('https://web-monitoring-cba12.firebaseio.com/resourceInfo.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                })
            })
        }
    }
}


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
};

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
};

const submitResourceInfo = (data) => {
    if (data && data.length) {
        requestIdleCallback(() => {
            fetch('https://web-monitoring-cba12.firebaseio.com/resourceInfo.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
        })
    }
};



const arr = [];
function f(arg) {
    arr.push(arg);
    const flArr = arr.flat(2);
    const x = flArr.map(item => {
        if (item.initiatorType === 'css' || item.initiatorType === 'script' || item.initiatorType === 'link') {
            return resourcesData(item);
        } else if (item.initiatorType === 'navigation') {
            return navigationData(item);
        } else if (item.initiatorType === 'xmlhttprequest') {
            return requestsData(item);
        } else if (item.initiatorType === 'img') {
            return imgData(item);
        } else {
            return otherData(item);
        }
    });
    console.log(x);
    return x;
}

const resourceProcessing = (arr) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(f(arr));
        }, 15000);
    });

};


const po = new PerformanceObserver((list) => {
    const resources = resourceProcessing(list.getEntries().filter(item => item instanceof PerformanceResourceTiming));

    resources.then(r => {
        // submitResourceInfo(r);
    })

});

po.observe({ entryTypes: ['resource', 'navigation']});



setTimeout(() => {
    po.disconnect();
}, 15000);



// Navigation Data fn




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
                Request.postRequest([{message: `don't use eval(), you use eval ${usingEvalCount}`}]);
                evaluate.call(window, params);
            };
        }
    }
}

CheckUsingBadMethods.checkUsingEval();
CheckUsingBadMethods.checkUsingDocumentWrite();

window.eval('console.log(10+20)');


function navigationData(item) {
    return {
        domContentLoaded: item.domContentLoadedEventEnd - item.domContentLoadedEventStart,
        date: Date.now(),
        companyId: '1223334444',
        domComplete: item.domComplete,
        domInteractive: item.domInteractive,
        duration: item.duration,
        encodedBodySize: item.encodedBodySize,
        entryType: item.entryType,
        fetchStart: item.fetchStart,
        initiatorType: item.initiatorType,
        name: item.name,
        requestStart: item.requestStart,
        responseEnd: item.responseEnd,
        responseStart: item.responseStart,
        startTime: item.startTime,
        transferSize: item.transferSize,
        type: item.type,
    }
}


function resourcesData(item) {
    return {
        isCached: item.transferSize === 0,
        isMinified: item.name.includes(".min"),
        date: Date.now(),
        duration: item.duration,
        encodedBodySize: item.encodedBodySize,
        entryType: item.entryType,
        fetchStart: item.fetchStart,
        initiatorType: item.initiatorType,
        name: item.name,
        startTime: item.startTime,
        transferSize: item.transferSize,
    }
}


function requestsData(item) {
    return {
        date: Date.now(),
        duration: item.duration,
        encodedBodySize: item.encodedBodySize,
        entryType: item.entryType,
        fetchStart: item.fetchStart,
        initiatorType: item.initiatorType,
        name: item.name,
        startTime: item.startTime,
        transferSize: item.transferSize,
    };
}


function imgData(item) {
    return {
        isCached: item.transferSize === 0,
        needToChangeImgFormat: !/.*\.(webp+|svg+|gif+)/ig.test(item.name),
        date: Date.now(),
        duration: item.duration,
        encodedBodySize: item.encodedBodySize,
        entryType: item.entryType,
        fetchStart: item.fetchStart,
        initiatorType: item.initiatorType,
        name: item.name,
        startTime: item.startTime,
        transferSize: item.transferSize,
    }
}

function otherData(item) {
    return {
        isCached: item.transferSize === 0,
        date: Date.now(),
        duration: item.duration,
        encodedBodySize: item.encodedBodySize,
        entryType: item.entryType,
        fetchStart: item.fetchStart,
        initiatorType: item.initiatorType,
        name: item.name,
        startTime: item.startTime,
        transferSize: item.transferSize,
    }
}



/** DO NOT DELETE!!!!!!!!!! */

//for finding the image element from the source
// Array.from(document.getElementsByTagName('img')).filter(i => i.src=='https://www.nicepng.com/png/detail/503-5032252_shamim-amiri-blank-female-avatar-icon.png')
// requestIdleCallback( Resource.RequestTiming(), { timeout: 2000 });
/** DO NOT DELETE!!!!!!!!!! */
