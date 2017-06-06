function o (id, params) {

    var obj;

    var setObj = function (set, isElem, params) {

        obj = (function () {

            var object = set;
            var self = {};

            var addClass = function (obj, cls) {

                return obj.className += " " + cls;
            }

            var removeClass = function (obj, cls) {

                var originalClasses = obj.className.split(" ");
                var newClasses = "";

                for ( var i = 0; i < originalClasses.length; i++) {

                    if (originalClasses[i] !== cls) newClasses += originalClasses[i] + " ";
                }

                return obj.className = newClasses.slice(0, -1);
            }

            var hasClass = function (obj, cls) {

                var classes = obj.className.split(" ");
                var isClass = false;

                for ( var i = 0; i < classes.length; i++) {

                    if (classes[i] === cls) isClass = true;
                }

                return isClass;
            }

            var css = function (obj, property, value) {

                if (obj) {

                    if (property && value) obj.style[property] = value;

                    return property?obj.style[property]:null;
                }
            }

            var inner = function (content) {

                if (object) {

                    if(content)object.innerHTML = content;
                    else return object.innerHTML;

                }
            }

            var Attribute = function (attr, value) {

                if (isElem) {

                    if (object && attr) {

                        if (typeof value !== 'undefined') object.setAttribute(attr, value);

                        return object.getAttribute(attr);
                    } else {

                        return null;
                    }
                } else {

                    var count;

                    o.forEach(object, function (val, index) {

                        val.setAttribute(attr, value);
                        count = index;
                    });

                    return count + ": " +attr + " " + value;
                }
            }

            var initStyle = function (styles) {

                Object.keys(styles).forEach(function(key) {

                    css(object, key, styles[key]);
                });
            }

            var addListener = function (listener, callback) {

                if (object) object[listener] = callback;
            }

            var append = function (node) {

                if (typeof node === 'undefined') return;

                if (typeof node === 'object' && node+'' === 'nobject') node = node.o;

                if (object) object.appendChild(node);
            }

            var appendToParent = function (parentId) {

                var parent;

                if (typeof parentId === 'undefined') return;

                if (typeof parentId === 'object' && parentId+'' === 'nobject') parent = parentId;
                else parent = o('#'+parentId);

                if (typeof parent === 'object' && typeof object === 'object' && parent+'' === 'nobject') {

                    parent.append(object);
                }
            }

            if (params) {

                Object.keys(params).forEach(function(key) {

                    if (typeof params[key] === "object") {

                        switch (key) {

                            case "style":
                                initStyle(params[key]);
                                break;
                            case "append":
                                append(params[key]);
                                break;
                            case "parentId":
                                if (object) appendToParent(params[key]);
                                break;
                            case "parent":
                                if (object) appendToParent(params[key]);
                                break;
                        }
                    } else if (typeof params[key] === "string" || typeof params[key] === "number") {

                        switch (key) {

                            case "inner":
                                inner(params[key]);
                                break;
                            case "text":
                                if (object) object.innerText = params[key];
                                break;
                            case "parentId":
                                if (object) appendToParent(params[key]);
                                break;
                            case "parent":
                                if (object) appendToParent(params[key]);
                                break;
                            default:
                                Attribute(key, params[key]);
                        }
                    } else if (typeof params[key] === "function") {

                        switch (key) {

                            case "onclick":
                                addListener(key, params[key]);
                                break;
                            case "ondblclick":
                                addListener(key, params[key]);
                                break;
                            case "onmousedown":
                                addListener(key, params[key]);
                                break;
                            case "onmousemove":
                                addListener(key, params[key]);
                                break;
                            case "onmouseout":
                                addListener(key, params[key]);
                                break;
                            case "onmouseover":
                                addListener(key, params[key]);
                                break;
                            case "onmouseup":
                                addListener(key, params[key]);
                                break;
                            case "onkeydown":
                                addListener(key, params[key]);
                                break;
                            case "":
                                addListener(key, params[key]);
                                break;
                            case "onkeypress":
                                addListener(key, params[key]);
                                break;
                            case "onkeyup":
                                addListener(key, params[key]);
                                break;
                        }
                    }
                });
            }

            self.appendToParent = function (parentId) {

                return appendToParent(parentId);
            }

            self.inner = function (content) {

                return inner(content);
            }

            self.addClass = function (cls) {

                if (typeof object === undefined || typeof cls !== "string") return false;

                if (isElem) {

                    return addClass(object , cls);
                } else {

                    o.forEach(object, function (value, index) {

                        addClass(value, cls);
                    });

                    return cls;
                }
            }

            self.removeClass = function (cls) {

                if (typeof object === undefined || typeof cls !== "string") return false;

                if (isElem) {

                    return removeClass(object , cls);
                } else {

                    o.forEach(object, function (value, index) {

                        removeClass(value, cls);
                    });

                    return cls;
                }
            }

            self.switchClass = function (toRemove, toAdd) {

                if (typeof object === undefined || typeof toRemove !== "string" || typeof toAdd !== "string") return false;

                if (isElem) {

                    removeClass(object, toRemove);
                    return addClass(object, toAdd);
                } else {

                    o.forEach(object, function (value, index) {

                        removeClass(value, toRemove);
                        return addClass(value, toAdd);
                    });

                    return toAdd;
                }
            }

            self.hasClass = function (className) {

                if (object) {

                    return hasClass(object, className);
                }

                return null;
            }

            self.appendval = function (val) {

                if (typeof object !== undefined && typeof val !== undefined) {

                    return object.value += val;
                }

                return false;
            }

            self.val = function (val) {

                if (typeof object !== undefined && typeof val !== undefined) {

                    return object.value = val;
                }

                return false;
            }

            self.appendtext = function (text) {

                if (typeof object !== undefined && typeof text !== undefined) {

                    return object.innerText += text;
                }

                return false;
            }

            self.text = function (text) {

                if (!object) return null;

                if (isElem) {

                    if (typeof text !== undefined) return object.innerText = text;
                    else object.innerText;
                } else {

                    o.forEach(object, function (val, ind) {

                        if (typeof text !== undefined) val.innerText = text;
                    });

                    return text;
                }

                /*if (typeof object !== undefined && typeof text !== undefined) {

                    return object.innerText = text;
                }

                return false;*/
            }

            self.css = function (property, value) {

                if (!object) return null;

                if (isElem) {

                    return css(object, property, value);
                } else {

                    o.forEach(object, function (val, ind) {

                        css(val, property, value);
                    });
                }
            }

            self.show = function () {

                if (!object) return null;
                if (isElem) {

                    object.style.display = "inherit";
                } else {

                    o.forEach(object, function (value, index) {

                        value.style.display = "inherit";
                    });
                }
            }

            self.hide = function () {

                if (!object) return null;
                if (isElem) {

                    object.style.display = "none";
                } else {

                    o.forEach(object, function (value, index) {

                        value.style.display = "none";
                    });
                }
            }

            self.addListener = function (listener, callback) {

                if (!object) return null;
                if (isElem) {

                    object[listener] = callback;
                } else {

                    o.forEach(object, function (value, index) {

                        value[listener] = callback;
                    });
                }
            }

            self.removeListener = function (listener) {

                if (!object) return null;

                if (isElem) {

                    object[listener] = null;
                } else {

                    o.forEach(object, function (value, index) {

                        value[listener] = null;
                    });
                }
            }

            self.append = function (node) {

                append(node);
            }

            self.Attribute = function (attr, value) {


                return Attribute(attr, value);
            }

            self.Id = function(id) {

                return Attribute("id", id);
            }

            self.remove = function () {

                if (!object) return null;

                if (isElem) {

                    if (typeof object.remove === "function") object.remove();

                    if (typeof object.removeNode === "function") object.removeNode(true);
                } else {

                    while(object.length > 0){
                        object[0].parentNode.removeChild(object[0]);
                    }
                }
            }

            self.clear = function () {

                if (!object) return null;

                if (isElem) {

                    object.innerHTML = "";
                } else {

                    o.forEach(object, function (value, index) {

                        value.innerHTML = "";
                    });
                }
            }

            self.triggerEvent = function (event) {

                if (isElem) {

                    var newEvent = new Event(event);
                    object.dispatchEvent(newEvent);
                } else {

                    o.forEach(object, function (value, index) {

                        var newEvent = new Event(event);
                        value.dispatchEvent(newEvent);
                    });
                }
            }

            self.o = object;

            self.toString = function () {

                return 'nobject';
            }

            return self;
        })();
    }

    if(typeof id === "string" && (id[0] === "." || id[0] === "#" || id[0] === "_")) {


        if (id[0] === "#") {

            setObj(document.getElementById(id.substring(1,id.length)), true, params);
        } else if (id[0] === ".") {

            setObj(document.getElementsByClassName(id.substring(1,id.length)), false, params);
        } else {
            var isElem = false;
            if (id === "_body") isElem = true;
            setObj(document.querySelector(id.substring(1,id.length)), isElem, params);
        }
        return obj;
    } else if (typeof id === "string") {

        setObj(document.createElement(id), true, params);
        return obj;
    } else {

        return null;
    }
}

function StyleSheet () {

    var style = document.createElement('style');
    var classes = [];
    var elements = [];
    var nodes = [];
    var keyframes = [];
    var autoUpdate = true;

    var prefixes = {

        mozilla : {

            prefix : '-moz-',
            contains : function (key) {

                           return o.arrayIncludes(this.list, key);
                       },
            list : [

                'user-select',
                'animation',
                'transform',
                'perspective-origin',
                'perspective'
            ]
        },
        webkit : {

            prefix : '-webkit-',
            contains : function (key) {

                           return o.arrayIncludes(this.list, key);
                       },
            list : [

                'user-select',
                'filter',
                'animation',
                'transform',
                'perspective-origin',
                'perspective'
            ]
        },
        ie : {

            prefix : '-ms-',
            contains : function (key) {

                           return o.arrayIncludes(this.list, key);
                       },
            list : [

                'user-select',
                'transform',
                'perspective-origin',
                'perspective'
            ]
        },
        opera : {

            prefix : '-o-',
            contains : function (key) {

                           return o.arrayIncludes(this.list, key);
                       },
            list : [

                'user-select'
            ]
        }
    }

    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);

    var readElem = function (value, type) {

        var content = "";

        var prefix = (type==="class"?".":"#");
        prefix = (type==="node"?"":prefix);

        content += prefix + value.name + " {";

        Object.keys(value.settings).forEach(function(key) {

            if (typeof value.settings[key] === 'string') {

                content += key + ":" + value.settings[key] + ";";

                if (prefixes.webkit.contains(key)) content +=  prefixes.webkit.prefix + key + ":" + value.settings[key] + ";";
                if (prefixes.mozilla.contains(key)) content += prefixes.mozilla.prefix + key + ":" + value.settings[key] + ";";
                if (prefixes.ie.contains(key)) content += prefixes.ie.prefix + key + ":" + value.settings[key] + ";";
                if (prefixes.opera.contains(key)) content += prefixes.opera.prefix + key + ":" + value.settings[key] + ";";

            } else if (typeof value.settings[key] === 'object') {

                o.l.f(value.settings[key], function (v, i) {

                    content += key + ":" + v + ";";
                    if (prefixes.webkit.contains(key)) content += prefixes.webkit.prefix + key + ":" + v + ";";
                    if (prefixes.mozilla.contains(key)) content += prefixes.mozilla.prefix + key + ":" + v + ";";
                    if (prefixes.ie.contains(key)) content += prefixes.ie.prefix + key + ":" + v + ";";
                    if (prefixes.opera.contains(key)) content += prefixes.opera.prefix + key + ":" + v + ";";
                });
            }


        });

        content += "}";

        return content;
    }

    var readKeyframes = function (keyframe) {

        var tmpKeyframes = "@keyframes " + keyframe.name + " {";
        var tmpKeyframesWegkit = "@-webkit-keyframes " + keyframe.name + " {";
        var tmpKeyframesMoz = "@-moz-keyframes " + keyframe.name + " {";


        Object.keys(keyframe.settings).forEach(function(key) {

            tmpKeyframes += key + " {" + keyframe.settings[key] + ";} ";
            tmpKeyframesWegkit += key + " {" + keyframe.settings[key] + ";} ";
            tmpKeyframesMoz += key + " {" + keyframe.settings[key] + ";} ";
        });

        tmpKeyframes += "} ";
        tmpKeyframesWegkit += "} ";
        tmpKeyframesMoz += "} ";

        return tmpKeyframes + tmpKeyframesWegkit + tmpKeyframesMoz;
    }

    var updateStyleSheet = function (isUpdate) {

        if (autoUpdate || isUpdate) {

            var content = "";

            o.forEach(nodes, function (value, index) {

                content += readElem(value, "node");
            });

            o.forEach(classes, function (value, index) {

                content += readElem(value, "class");
            });

            o.forEach(elements, function (value, index) {

                content += readElem(value, "element");
            });

            o.forEach(keyframes, function (value, index) {

                content += readKeyframes(value);
            });

            style.innerHTML = content;
        }
    }

    this.addClass = function (name, settings) {

        settings = settings?settings:{};
        classes.push({name:name, settings:settings});
        updateStyleSheet();
    }

    this.addElement = function (name, settings) {

        settings = settings?settings:{};
        elements.push({name:name, settings:settings});
        updateStyleSheet();
    }

    this.addNode = function (name, settings) {

        settings = settings?settings:{};
        nodes.push({name:name, settings:settings});
        updateStyleSheet();
    }

    this.addKeyframes = function (name, settings) {

        settings = settings?settings:[];
        keyframes.push({name:name, settings:settings});
        updateStyleSheet();
    }

    /*
    this.removeClass = function (name) {

        o.forEach(classes, function (value, index) {

            (value.name === name) classes.splice(index, 1);
        });
    }

    this.removeElement = function (name) {

        o.forEach(elements, function (value, index) {

            (value.name === name) elements.splice(index, 1);
        });
    }
    */
    this.getClass = function (name) {

        o.forEach(classes, function (value, index) {

            if (value.name === name) return value.settings;
        });

        return null;
    }

    this.getElement = function (name) {

        o.forEach(elements, function (value, index) {

            if (value.name === name) return value.settings;
        });

        return null;
    }

    this.getNode = function (name) {

        o.forEach(nodes, function (value, index) {

            if (value.name === name) return value.settings;
        });

        return null;
    }

    this.update = function () {

        updateStyleSheet(true);
    }

    this.clear = function () {

        style.innerHTML = "";
    }

    this.autoUpdate = function (set) {

        if (set !== undefined) autoUpdate = set;
        return set;
    }
}

o.math = {};

o.math.addition = function (a, b) {

    return a+b;
}

o.math.subtraction = function (a, b) {

    return a-b;
}

o.math.toDigit = function (number, decimalPlaces, decimalMark) {

    return decimalMark?(parseFloat(Math.round(number * 100) / 100).toFixed(decimalPlaces)+"").replace(".",decimalMark):parseFloat(Math.round(number * 100) / 100).toFixed(decimalPlaces);
}

o.toBool = function (value) {

    var myBool = false;

    if (typeof value === "string" && value.toLowerCase() === "true") myBool = true;
    if (typeof value === "number" && value === 1) myBool = true;
    if (typeof value === "object") myBool = true;

    return myBool;
}

o.operands = {};
o.operands.addition = 0;
o.operands.subtraction = 1;
o.operands.multiplication = 2;
o.operands.division = 3;

o.clone = function (obj) {

    if(typeof obj !== "object")
        return {};
    else
        return JSON.parse(JSON.stringify(obj));
}

o.delete = function (obj) {

    obj = null;
}

o.forEach = function (array, onStep) {

    if (typeof array === "number") {

        for (var i = 0; i < array; i++) {

            if (typeof onStep === "function") onStep(i);
        }
    } else {

        for (var i = 0; i < array.length; i++) {

            if (typeof onStep === "function") onStep(array[i], i);
        }
    }
}

o.forEachRevers = function (array, onStep) {

    if (typeof array === "number") {

        for (var i = array; i < 0; i++) {

            if (typeof onStep === "function") onStep(i);
        }
    } else {

        for (var i = array.length - 1; i >= 0; i--) {

            if (typeof onStep === "function") onStep(array[i], i);
        }
    }
}

o.arrayIncludes = function (array, element) {

    return array.indexOf(element) > -1;
}

o.arrayCombination = function (array, operand) {

    var combinnation;

    switch(operand) {

        case o.operands.addition:
            combinnation = array.reduce(function(a, b) {

                return a + b;
            });
            break;
        case o.operands.subtraction:
            combinnation = array.reduce(function(a, b) {

                return a - b;
            });
            break;
        case o.operands.multiplication:
            combinnation = array.reduce(function(a, b) {

                return a * b;
            });
            break;
        case o.operands.division:
            combinnation = array.reduce(function(a, b) {

                return a / b;
            });
            break;
    }

    return combinnation;
}

o.arrayMultiply = function (array, multiplier, operand) {

    var multipliedArray = [];

    switch(operand) {

        case o.operands.addition:
            o.forEach(array, function (value, index) {

                multipliedArray.push(value+multiplier);
            });
            break;
        case o.operands.subtraction:
            o.forEach(array, function (value, index) {

                multipliedArray.push(value-multiplier);
            });
            break;
        case o.operands.multiplication:
            o.forEach(array, function (value, index) {

                multipliedArray.push(value*multiplier);
            });
            break;
        case o.operands.division:
            o.forEach(array, function (value, index) {

                multipliedArray.push(value/multiplier);
            });
            break;
    }

    return multipliedArray;
}

o.arrayArrayMultiply = function (arrayA, arrayB, operand, newArray) {

    var multipliedArray = [];

    switch(operand) {

        case o.operands.addition:
            o.forEach(arrayA, function (value, index) {

                multipliedArray.push(value+arrayB[index]);
            });
            break;
        case o.operands.subtraction:
            o.forEach(arrayA, function (value, index) {

                multipliedArray.push(value-arrayB[index]);
            });
            break;
        case o.operands.multiplication:
            o.forEach(arrayA, function (value, index) {

                multipliedArray.push(value*arrayB[index]);
            });
            break;
        case o.operands.division:
            o.forEach(arrayA, function (value, index) {

                multipliedArray.push(value/arrayB[index]);
            });
            break;
    }

    if (newArray) arrayA = multipliedArray;
    return multipliedArray;
}

o.arraysEqual = function (arrayA, arrayB) {

    return JSON.stringify(arrayA)===JSON.stringify(arrayB);
}

o.triggerEvent = function (element, event) {

    var newEvent = new Event(event);
    element.dispatchEvent(newEvent);
}

o.addConstant = function (object, constantName, constantValue) {

    Object.defineProperty(object, constantName, {

        enumerable: true,
        writable: false,
        value: constantValue,
        configurable: false
    });
}

o.numToPx = function (number) {

    return number+"px";
}

o.loadCSS = function (urls) {

    var result = false;

    var loader = function (url) {

        o('_head').o.innerHTML += '<link rel="stylesheet" type="text/css" href="'+url+'">';
    }

    if (typeof urls === 'string') {

        loader(urls);
        result = true;
    } else if (typeof urls === 'object') {

        o.forEach(urls, function (v, i) {

            loader(v);
        });

        result = true;
    }

    return result;
}

o.loadScripts = function (urls) {

    var result = false;

    var loader = function (url) {

        o('_head').o.innerHTML += o('script', {src : url, charset : 'UTF-8'}).o;
    }

    if (typeof urls === 'string') {

        loader(urls);
        result = true;
    } else if (typeof urls === 'object') {

        o.forEach(urls, function (v, i) {

            loader(v);
        });

        result = true;
    }

    return result;
}

o.browserDetection = function () {

    var browser = {};

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!ua.match(/Trident.*rv\:11\./))
    {
        browser.type = "IE";
        browser.version = msie + 5;
    }
    else
    {
        browser.version = "unknown";
    }

    return browser;
}

o.animateSteps = function (onstep, stepsCount, moveLength, moveBegin, moveSpeed, onend) {

    var maxStep = stepsCount;
    var step = 0;
    var moveStep = moveLength/maxStep;
    var move = moveBegin;

    var interval = setInterval(function () {

        step++;
        move += moveStep;
        onstep(maxStep, step, move);

        if (step >= maxStep) {

            clearInterval(interval);

            if (typeof onend === 'function') onend();
        }
    }, 1000/moveSpeed);
}

o.animateSprite = function (id, sizeX, sizeY, countX, countY, count, fps) {

    var steps = 0;
    var stepX = 0;
    var stepY = 0;
    var element = o('#'+id);

    return setInterval(function () {

            element.css('background-position', -stepX*sizeX+'px '+(-stepY*sizeX+'px'));
            stepX++;
            steps++;
            if (stepX >= countX) {

                stepX = 0;
                stepY++;
            }
            if (steps === count) {

                steps = 0;
                stepX = 0;
                stepY = 0;
            }
        }, 1000/fps);
}

o.get = function (url) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.response;
}

o.a = {}; //array
o.a.am = o.arrayArrayMultiply;
o.a.m = o.arrayMultiply;
o.a.c = o.arrayCombination;
o.a.e = o.arraysEqual;

o.l = {}; //loop
o.l.f = o.forEach;
o.l.fr = o.forEachRevers;

o.m = {}; //math


o.c = {}; //comunication
o.c.g = o.get;


o.e = {}; //events
o.e.r = o.ready;

o.o = {}; //objects
o.o.c = o.clone;
o.o.ac = o.addConstant;
o.o.d = o.delete;


o.s = {}; //style


o.n = {}; //node
o.n.ntp = o.numToPx;
o.n.ls = o.loadScripts;

o.cl = console.log;

o.ready = function (todo) {

	document.onreadystatechange = function () {

        if (document.readyState == "complete") {

            if (todo && typeof todo === "function") todo();
        }
    };
}

o.loadScript = function (scripts) {

    var head = o('_head');

    if (typeof scripts === "string") head.append(o('script', {src : scripts}).o);

    if (typeof scripts === "object") o.forEach(scripts, function (v, i) {

        head.append(o('script', {src : v}).o);
    });
}

var ps = (function () {
    'use strict';

    var self = {};

    var add = function (constant, value) {

        value = value?value:constant;

        Object.defineProperty(self, constant, {

            enumerable: true,
            writable: false,
            value: value,
            configurable: false
        });
    }

    add('cover');
    add('contain');
    add('static');
    add('relative');
    add('fixed');
    add('absolute');
    add('solid');
    add('center');
    add('none');
    add('initial');
    add('inherit');
    add('infinite');
    add('time');
    add('hidden');
    add('noRepeat', 'no-repeat');
    add('repeat');
    add('contentBox', 'content-box');
    add('borderBox', 'border-box');
    add('paddingBox', 'padding-box');

    return self;
})();

requestAnimationFrame = ( function(callback) {

    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {

        window.setTimeout(callback, 1000 / 60);
    };
})();

cancelAnimationFrame = ( function(id) {

    return window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {

        clearInterval(id);
    };
})();
