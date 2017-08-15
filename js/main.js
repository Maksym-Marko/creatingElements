class CreatingElement{
	constructor(regString, objAppendID){
		this.regString = regString;
		this.objAppendID = objAppendID;
	}

	toReadeString(){

		/*----------- Regular expressions -------------*/

		// reg obj
		let regObj = {};

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

	getPropsEl(){

		/*------------ string --------------*/
		let _string = this.regString;

		/*------------ get props --------------*/
		let propsObj = {};

		propsObj.elementName 	= _string.match(this.toReadeString().elementName);
		propsObj.className 		= _string.match(this.toReadeString().className);
		propsObj.idName 		= _string.match(this.toReadeString().idName);
		propsObj.inside 		= _string.match(this.toReadeString().inside);

		return propsObj;

	}

	createElement(){
		
		// is elementName
		let _elementName = ( this.getPropsEl().elementName === null ) ? 'div' : this.getPropsEl().elementName[1];

		// is className
		let _className = ( this.getPropsEl().className === null ) ? '' : this.getPropsEl().className[1];

		// is idName
		let _idName = ( this.getPropsEl().idName === null ) ? '' : this.getPropsEl().idName[1];


		let el = document.createElement(_elementName);
		el.className = _className;
		el.id = _idName;

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

	toReadeStringInside(){

		// 

	}

	inside(){
		console.log(this.getPropsEl().inside[1]);
		// is elementName
	}


}

let newEl = new CreatingElement( '<form #someID .someClass inside(<input type="text" value="Some value")', 'mxApp' );
newEl.createElement();