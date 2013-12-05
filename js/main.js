(function() {
    
    var component = {
        
        init: function() {
            
            this.bind();
            
        },
        
        bind: function() {
            
            $('textarea').change( $.proxy(this, 'findValues' ));
            
        },
        
        findValues: function( textarea ) {
            
            var currentTarget = $(textarea.currentTarget)
                , value = $.trim(currentTarget.val())           //value to change
                , square = currentTarget.closest('div')         //container
                , image = square.children('img')                //img to change
                , classList = square.attr('class').split(' ')
                , transform = classList[1];                     //type of transform
                ;
                
            // console.log(textarea);
            
            // validate, then change
            if ( this.validateValues( transform, value ) ) {
                console.log(true, value);
                
                currentTarget.removeClass('red');
                
                this.changeValues( image, transform, value );
            }
            else {
                console.log(false, value);
                //change color
                currentTarget.addClass('red');
            }
        },
        
        changeValues: function( image, transform, value ) {
            
            console.log(image);
            image.css({"transform:": transform + "(" + value +")"});
            
        },
        
        validateValues: function( transform, value ) {
            
            var isTranslate = /translate(X|Y)?/
                , isSkew = /skew(X|Y)?/
                , isRotate = /rotate(X|Y)?/
                , isScale = /scale(X|Y)?/
                , lengthOrPercent = /^-?\d+(%|px|em|pc|in|mm|deg)$/
                , lengthOnly = /^-?\d+(px|em|pc|in|mm|deg)$/
                , angleDeg = /^-?\d+(deg)$/
                , unitlessDigit = /^\d*\.?\d+$/
                ;
            
            // translate: length or %
            if( isTranslate.test( transform ) ) {
                if( lengthOrPercent.test( value ) ) return true;                
            }
            // skew + rotate: deg + angle
            if( isSkew.test( transform ) || isRotate.test( transform ) ) {
                if( angleDeg.test( value ) ) return true;                
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