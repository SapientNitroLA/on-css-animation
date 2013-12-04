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
            
            // validate, then change
            if ( this.validateValues( transform, value ) ) {
                
                this.changeValues( image, transform, value );
            }            
        },
        
        changeValues: function( image, transform, value ) {
            
            
            
            return true;
        },
        
        validateValues: function( transform, value ) {
            var regex;
            
            // translate: length or %
            if( transform === 'translate' ) {
                regex = '(\-)?\d+(\%|px|em|pc|in|mm|deg)';
                
                console.log('transform!');
            }
            // skew + rotate: deg + angle
            if( transform === 'skew' | 'rotate') {
                regex = '(\-)?\d+(deg)';
            }
            
            // scale: unitless #
            if( transform === 'scale' ) {
                regex = '\d*\.?\d+';
            }
            // perspective: length
            if ( transform === 'perspective' ){
                regex = '(\-)?\d+(px|em|pc|in|mm|deg)';
            }
            
        }
    };
    
    return component.init();    
    
}());