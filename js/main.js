window.elements = {};

class CreatingElement{
	constructor(regString, objAppendID){
		this.regString = regString;
		this.objAppendID = objAppendID;
		this.markEl = 'el_' + this.sizingElements();
	}

	sizingElements(){
		// sizing obj elements
		let countElements = Object.keys(elements).length;
		let markElement = (countElements === 0) ? 0 : countElements++;
		return markElement;
	}

	toReadeString(){

		/*----------- Regular expressions -------------*/

		// reg obj
		let regObj = {};

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

	getPropsEl(){

		/*------------ string --------------*/
		let _string = this.regString;

		/*------------ get props --------------*/
		let propsObj = {};

		propsObj.elementName 		= _string.match(this.toReadeString().elementName);
		propsObj.className 			= _string.match(this.toReadeString().className);
		propsObj.idName 			= _string.match(this.toReadeString().idName);
		propsObj.inside         	= {};
		propsObj.inside.countEl		= _string.match(this.toReadeString().countEl);
		propsObj.inside.srting  	= _string.match(this.toReadeString().inside);

		return propsObj;

	}

	createElement(){
		
		// is elementName
		let _elementName = ( this.getPropsEl().elementName === null ) ? 'div' : this.getPropsEl().elementName[1];

		// is className
		let _className = ( this.getPropsEl().className === null ) ? '' : this.getPropsEl().className[1];

		// is idName
		let _idName = ( this.getPropsEl().idName === null ) ? '' : this.getPropsEl().idName[1];

		// create element
		let el = document.createElement(_elementName);
		el.className = _className;
		el.id = _idName;	

		// mark elements		
		let _el = this.markEl;
		elements[_el] = el;

		// append element
		if( this.objAppendID === undefined ){
			document.body.append(el);
		} else{
			let _objAppendID = document.getElementById(this.objAppendID);
			_objAppendID.append(el);
		}		

		/*---------------- inside element -------------------------*/
		if( this.getPropsEl().inside !== null ){
			this.inside();
		}		
		
	}

	inside(){

		// str
		let _string = this.getPropsEl().inside.srting[1];

		// elementName
		let elementName = _string.match(this.toReadeString().elementName);
		let _elementName = (elementName === null) ? 'div' : elementName[1];

		// type
		let elementType = _string.match(this.toReadeString().type);
		let _elementType = (elementType === null) ? 'text' : elementType[1];

		// value
		let elementValue = _string.match(this.toReadeString().value);
		let _elementValue = (elementValue === null) ? '' : elementValue[1];

		let plusEl = (this.getPropsEl().inside.countEl === null) ? 1 : this.getPropsEl().inside.countEl[1]; 
		
		// append
		for( let i=0; i<plusEl; i++ ){
			// create el
			let insideElement = document.createElement(_elementName);

			// set type
			if(elementType !== null){
				insideElement.setAttribute('type', _elementType);
			}

			// set value
			if(elementValue !== null){
				insideElement.setAttribute('value', _elementValue);
			}			
		
			elements[this.markEl].appendChild(insideElement);

		}		
	
	}


}

function Element( str, app ){
	let newEl = new CreatingElement( str, app );
	newEl.createElement();
}