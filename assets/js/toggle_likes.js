// const { $where } = require("../../models/post");

class ToggleLike{
    constructor(toggleElement){
        this.toggler=toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            console.log(e);
            console.log('before def');
            e.preventDefault();
            console.log('after def');
            let self=this;

            $.ajax({
                type:'POST',
                url:$(e.target).attr('href'),
            })
            .done(function(data){
                let likesCount =parseInt($(self).attr('data-likes'));
                console.log(likesCount);

                if(data.data.deleted== true){
                    likesCount -= 1;
                }else{
                    likesCount +=1;
                }

                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log('error in completing the request',errData);
            });
        });
    }
}