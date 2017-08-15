'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreatingElement = function () {
		function CreatingElement(regString, objAppendID) {
				_classCallCheck(this, CreatingElement);

				this.regString = regString;
				this.objAppendID = objAppendID;
		}

		_createClass(CreatingElement, [{
				key: 'toReadeString',
				value: function toReadeString() {

						/*----------- Regular expressions -------------*/

						// reg obj
						var regObj = {};

						// find element name
						regObj.elementName = /<(\w+[^\s])/;

						// find class name
						regObj.className = /\.(\w+[^\s])/;

						// find id name
						regObj.idName = /\#(\w+[^\s])/;

						// find inside element
						regObj.inside = /inside\((.*)\)/;

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
						propsObj.inside = _string.match(this.toReadeString().inside);

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

						var el = document.createElement(_elementName);
						el.className = _className;
						el.id = _idName;

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
				key: 'toReadeStringInside',
				value: function toReadeStringInside() {

						// 

				}
		}, {
				key: 'inside',
				value: function inside() {
						console.log(this.getPropsEl().inside[1]);
						// is elementName
				}
		}]);

		return CreatingElement;
}();

var newEl = new CreatingElement('<form #someID .someClass inside(<input type="text" value="Some value")', 'mxApp');
newEl.createElement();