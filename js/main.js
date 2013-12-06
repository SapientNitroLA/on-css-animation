(function() {
    
    /* TransformObj
     * 
        transform:  the type of transform
        value:      value to change 
        img:        image manipulated
        array:      array of textarea values 
        index:      index of textarea changed
     *
    */
    
    var transformObj = {};
    
    var component = {
        
        init: function() {
            
            this.bind();
            
        },
        
        bind: function() {
            
            var self = this;
            
            // $('textarea').on('change', $.proxy(this, 'findValues' ));
            
            // $('.matrix textarea').on('click', function(e) {
            //     console.log($(this).index());
            // });
            
            $('textarea').on('change', function(e) {
                
                transformObj.index = $(this).index();
                
                self.findValues( e );
            });
            
            // $('.matrix textarea').on('click', $.proxy(this, 'findMatrixValues'));
            
        },
        
        findMatrixValues: function( e ) {
            
            // console.log($(this).index());
            
            // console.log($(matrix).index());
            // console.log(matrix.index());
        },
        
        findValues: function( textarea ) {
            
            var currentTarget = $(textarea.currentTarget)
                , value = $.trim(currentTarget.val())           //value to change
                , square = currentTarget.closest('div')         //container
                , classList = square.attr('class').split(' ')
                , textareaArray = square.find('textarea')
                ;
            
            transformObj.image = square.children('img');
            transformObj.transform = classList[1];
            
            // validate, then change
            if ( this.validateValues( transformObj.transform, value ) ) {
                
                transformObj.value = value;
                transformObj.valueArray = [];
                
                currentTarget.removeClass('red');
                
                textareaArray.each(function (i, e) {
                    
                    transformObj.valueArray.push($(e).val());
                });
                
                this.changeValues();
            }
            else {
                // console.log(false, value);
                //change color
                currentTarget.addClass('red');
            }
        },
        
        // createTransformObj: function( currentTarget, square, image, transform, value ) {
        //     
        //     transformObj.name = transform;
        //     transformObj.image = image;
        //     transformObj.value = value;
        //     
        //     //index + text area values!
        //     
        // },
        
        changeValues: function() {
            
            var isOneValue = /^\w*(X|Y)$/
                , transformVal = transformObj.transform
                , value = transformObj.value
                , image = transformObj.image
                , transformString
                ;
                
            if( isOneValue.test( transformVal ) || transformVal === 'perspective' ) {
                console.log('is one value');
                transformObj.image.css({transform: transformVal + "(" + value + ")"});
            }
            else if( transformVal === 'perspectiveX' ) {
                //could be rotate insteaed of perspective
            }
            else if( transformVal === 'matrix' ) {
                //well crap
            }
            else {
                console.log('else');
                // var val1, val2;
                // it is either first or second value of a non X|Y transform
                // if( transformVal.index === 0 ) {
                transformString = transformVal + "("+ transformObj.valueArray[0] + ", " + transformObj.valueArray[1] +")";
                
                console.log(transformString);
                    
                image.css({
                    -webkit-transform: transformString });


                
                // image.css({transform: transformVal + "("+ val1 + ", " + val2 +")"});
                // if( !textarea.lastElementChild ) {
                //     console.log('there is a last element child');
                //     //its the first value area 
                //     image.css({transform: transformVal + "X(" + value + ")"});
                // }
                // else {
                //     //its the second value area
                //     image.css({transform: transformVal + "Y(" + value + ")"});
                // }
            }
            
            // console.log(textarea);
            // console.log(transformVal+"("+value+")");
            // image.css({-webkit-transform: transform + "(" + value +")"});
            image.css({transform: transformVal + "(" + value +")"});
            
        },
        
        validateValues: function( transform, value ) {
            
            var isTranslate = /translate(X|Y)?/
                , isSkew = /skew(X|Y)?/
                , isRotate = /rotate(X|Y)?/
                , isScale = /scale(X|Y)?/
                , lengthOrPercent = /^-?\d+(%|px|em|pc|in|mm|deg)$/
                , lengthOnly = /^-?\d+(px|em|pc|in|mm|deg)$/
                , angleDeg = /^-?\d+(deg)$/
                , angleTurn = /^-?\d+(deg|turn)$/
                , unitlessDigit = /^\d*\.?\d+$/
                ;
            
            // translate: length or %
            if( isTranslate.test( transform ) ) {
                if( lengthOrPercent.test( value ) ) return true;                
            }
            // skew: deg + angle
            if( isSkew.test( transform ) ) {
                if( angleDeg.test( value ) ) return true;                
            }
            // rotate: deg + turn
            if ( isRotate.test( transform ) ) {
                if( angleTurn.test( value ) ) return true;
            }
            // scale: unitless #
            if( isScale.test( transform ) || transform === 'matrix') {
                if( unitlessDigit.test( value ) ) return true;                
            }
            // perspective: length
            if ( transform === 'perspective' ){
                if( lengthOnly.test( value ) ) return true;
            }
            
            return false;
        }
    };
    
    return component.init();    
    
}());