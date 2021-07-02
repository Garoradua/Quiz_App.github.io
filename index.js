
$(document).ready(function(){
    var form = $("#question-answer");
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz",function(response){
        
        for(i=0; i<response.length; i++){
            var section = $("<section>");
            var question = $("<h3>").html("Q"+ response[i].id + " " + response[i].question);
            section.append(question);
            for(j=0; j<response[i].options.length; j++){
                var label = $("<label>").addClass("option-wrapper").attr("id","q"+response[i].id+"-"+(j+1));
                var input = $("<input>").attr("type","radio").attr("name","q"+response[i].id).attr("value",(j+1)).attr("required","true");
                // var icon = $("<i>");
                var span = $("<span>").html(response[i].options[j]);
                // span.append(icon);
                label.append(input);
                label.append(span);
                section.append(label);
                
            }
            form.append(section);
            
        }
        var result = [];
        form.append($("<input>").attr("type","submit").addClass("submit"));
        $(form).submit(function(e){
            e.preventDefault();
            var radioButton = $(".option-wrapper input");
            for(var i=0; i<radioButton.length; i++){
               if(radioButton[i].checked){
                   result[radioButton[i].name] = radioButton[i].value;
    
               }
            }
            console.log(result);
       
            var count = 0;
            for(i=0; i<response.length; i++){
                if(result["q"+response[i].id]== response[i].answer){
                    count++;
                   $("#q"+response[i].id+"-"+response[i].answer +" span").append('  <i class="fas fa-check"></i>').addClass("tick");
                  
                }
                else{
                    // var wrong = result[radioButton[i].name];
                     $("#q"+response[i].id+"-"+result["q"+response[i].id] +" span").append('<i class="fas fa-times"></i>').addClass("wrong");
                    //  append('<i  class="far fa-times"></i>');
                     $("#q"+response[i].id+"-"+response[i].answer +" span").addClass("tick").append('<i class="fas fa-check"></i>');
                }
            }
            console.log(count);
            $("#score").html(count+"/5")
        })  
    });
});

// <!-- <section>
// <h3> Q1 </h3>
// <label class="option-wrapper" >
// <input type="radio" name="q1" value="1"> 
// <span>option 1</span>
// </label>
// <label class="option-wrapper">
// <input type="radio" name="q1" value="2"> 
// <span>option 2</span>
// </label>
// <label class="option-wrapper">
// <input type="radio" name="q1" value="3"> 
// <span>option 3</span>
// </label>
// <label class="option-wrapper">
// <input type="radio" name="q1" value="4"> 
// <span>option 4</span>
// </label>
// </section>
