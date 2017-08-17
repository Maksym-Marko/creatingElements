'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.elements = {};

var CreatingElement = function () {
		function CreatingElement(regString, objAppendID) {
				_classCallCheck(this, CreatingElement);

				this.regString = regString;
				this.objAppendID = objAppendID;
				this.markEl = 'el_' + this.sizingElements();
		}

		_createClass(CreatingElement, [{
				key: 'sizingElements',
				value: function sizingElements() {
						// sizing obj elements
						var countElements = Object.keys(elements).length;
						var markElement = countElements === 0 ? 0 : countElements++;
						return markElement;
				}
		}, {
				key: 'toReadeString',
				value: function toReadeString() {

						/*----------- Regular expressions -------------*/

						// reg obj
						var regObj = {};

						// find element name
						regObj.elementName = /<(\w+[^\s])/;

						// find class name
						regObj.className = /\.([\w-_]+)/;

						// find id name
						regObj.idName = /\#([\w_]+)/;

						// find inside element
						regObj.inside = /inside\((.*)\)/;

						// count elements
						regObj.countEl = /inside\(.*\)\+(\d)/;

						// type
						regObj.type = /type=\"(\w+)\"/;

						// value
						regObj.value = /value=\"(\w.+)\"/;

						return regObj;
				}
		}, {
				key: 'getPropsEl',
				value: function getPropsEl() {

						/*------------ string --------------*/
						var _string = this.regString;

						/*------------ get props --------------*/
						var propsObj = {};

						propsObj.elementName = _string.match(this.toReadeString().elementName);
						propsObj.className = _string.match(this.toReadeString().className);
						propsObj.idName = _string.match(this.toReadeString().idName);
						propsObj.inside = {};
						propsObj.inside.countEl = _string.match(this.toReadeString().countEl);
						propsObj.inside.srting = _string.match(this.toReadeString().inside);

						return propsObj;
				}
		}, {
				key: 'createElement',
				value: function createElement() {

						// is elementName
						var _elementName = this.getPropsEl().elementName === null ? 'div' : this.getPropsEl().elementName[1];

						// is className
						var _className = this.getPropsEl().className === null ? '' : this.getPropsEl().className[1];

						// is idName
						var _idName = this.getPropsEl().idName === null ? '' : this.getPropsEl().idName[1];

						// create element
						var el = document.createElement(_elementName);
						el.className = _className;
						el.id = _idName;

						// mark elements		
						var _el = this.markEl;
						elements[_el] = el;

						// append element
						if (this.objAppendID === undefined) {
								document.body.append(el);
						} else {
								var _objAppendID = document.getElementById(this.objAppendID);
								_objAppendID.append(el);
						}

						/*---------------- inside element -------------------------*/
						if (this.getPropsEl().inside !== null) {
								this.inside();
						}
				}
		}, {
				key: 'inside',
				value: function inside() {

						// str
						var _string = this.getPropsEl().inside.srting[1];

						// elementName
						var elementName = _string.match(this.toReadeString().elementName);
						var _elementName = elementName === null ? 'div' : elementName[1];

						// type
						var elementType = _string.match(this.toReadeString().type);
						var _elementType = elementType === null ? 'text' : elementType[1];

						// value
						var elementValue = _string.match(this.toReadeString().value);
						var _elementValue = elementValue === null ? '' : elementValue[1];

						var plusEl = this.getPropsEl().inside.countEl === null ? 1 : this.getPropsEl().inside.countEl[1];

						// append
						for (var i = 0; i < plusEl; i++) {
								// create el
								var insideElement = document.createElement(_elementName);

								// set type
								if (elementType !== null) {
										insideElement.setAttribute('type', _elementType);
								}

								// set value
								if (elementValue !== null) {
										insideElement.setAttribute('value', _elementValue);
								}

								elements[this.markEl].appendChild(insideElement);
						}
				}
		}]);

		return CreatingElement;
}();

function Element(str, app) {
		var newEl = new CreatingElement(str, app);
		newEl.createElement();
}