
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


const imagesProcessing = images => {
    return images.map(item => {
        const obj = {
            isCached: item.transferSize === 0
        };

        for(let key in item) {
            obj[key] = item[key];
        }

        return obj;
    })
};

const requestProcessing = (arr) => {
    console.log(arr);
};

const cssProcessing = links => {
    console.log(links);
};

const resourceProcessing = (arr) => {
    return [...imagesProcessing(arr.filter(item => item.initiatorType === 'img'))];
};

const navigationProcessing = (arr) => {
    console.log(arr);
    return arr.map(item => {
        const obj = {
            domContentLoaded: item.domContentLoadedEventEnd - item.domContentLoadedEventStart,
        };

        for(let key in item) {
            obj[key] = item[key];
        }

        return obj;
    })
};






const po = new PerformanceObserver((list) => {
    const dom = navigationProcessing(list.getEntries().filter(item => item instanceof PerformanceNavigationTiming));
    const resources = resourceProcessing(list.getEntries().filter(item => item instanceof PerformanceResourceTiming));

    console.log('DOM =>', dom);
    console.log('resources =>', resources);
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
