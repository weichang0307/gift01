const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const ww=600;
const wh=1000;
let frame=0;
let to=6;
let stage=6;
let img1;
let found=0;
let questions=[
    {q:'張博崴的生日?',opt1:'3/7',opt2:'7/13',opt3:'3/17',ans:0},
    {q:'蕭珮心的生日?',opt1:'9/10',opt2:'9/19',opt3:'1/19',ans:1},
    {q:'第一次見面?',opt1:'打球',opt2:'路邊',opt3:'上課',ans:0},
    {q:'第一次傳訊息?',opt1:'問事',opt2:'問功課',opt3:'問人',ans:2},
    {q:'交往紀念日?',opt1:'11/25',opt2:'11/16',opt3:'11/26',ans:2},
    {q:'張博崴78嗎?',opt1:'是',opt2:'是，但我喜歡',opt3:'不是',ans:1}
]

mysize();

function init(){
    img1=new Image();
    img1.src=img1_src;


    addEventListener('click',(e)=>{
        let p=get_p_in_world(e.pageX,e.pageY);
        if(850<p[1]&&to>0&&to!=10){
            if(p[0]<200){
                if(questions[6-to].ans==0){
                    to-=1;
                }else{
                    to=10;
                }
            }else if(p[0]>400){
                if(questions[6-to].ans==2){
                    to-=1;
                }else{
                    to=10;
                }

            }else{
                if(questions[6-to].ans==1){
                    to-=1;
                }else{
                    to=10;
                }

            }
        }
        if(stage<=0){
            if(Math.abs(p[0]-189.6)<10&&Math.abs(p[1]-304.3)<10){
                found=1;
            }
        }
    })
}


function draw(){
    frame+=1;
    if(stage>to&&to!=10){
        stage-=0.01;
    }
    ctx.fillStyle='black';
    ctx.fillRect(0,0,ww,wh);
    for(let x=0;x<11;x++){
        for(let y=0;y<14;y++){
            ctx.drawImage(img1,100*x,100*y,100,100,25+x*50+Math.cos(frame/50+x**2-y*8)*20*stage**2,25+y*50+Math.sin(frame/50+x**2-y*8)*20*stage**2,50,50);
        }
    }
    if(to>0&&to!=10){
        ctx.fillStyle='white';
        ctx.font='40px cursive'
        ctx.fillText(questions[6-to].q,300-ctx.measureText(questions[6-to].q).width/2,850);
        ctx.font='40px cursive'
        ctx.fillText(questions[6-to].opt1,100-ctx.measureText(questions[6-to].opt1).width/2,920);
        ctx.fillText(questions[6-to].opt2,300-ctx.measureText(questions[6-to].opt2).width/2,920);
        ctx.fillText(questions[6-to].opt3,500-ctx.measureText(questions[6-to].opt3).width/2,920);
    }
    if(stage<=0){
        ctx.fillStyle='white';
        ctx.font='60px cursive'
        ctx.fillText('聖誕快樂',300-ctx.measureText('聖誕快樂').width/2,850);
    }
    if(to==10){
        if(stage<10){
            stage+=0.1;
        }else{
            ctx.fillStyle='white';
            ctx.font='60px cursive'
            ctx.fillText('ㄨㄚˊ',300-ctx.measureText('ㄨㄚˊ').width/2,500); 
        }
    }
    if(found==1){
        ctx.fillStyle='gray';
        ctx.fillRect(0,0,ww,wh);
    }


    requestAnimationFrame(draw);
}






init();
draw();

function mysize(){
	if(window.innerHeight/window.innerWidth>=wh/ww){
		canvas.style.width=window.innerWidth+'px'
		canvas.style.height=wh*window.innerWidth/ww+'px'
		canvas.width=window.innerWidth
		canvas.height=wh*window.innerWidth/ww
		canvas.position='absolute'
		canvas.left=window.innerWidth-canvas.width/2
		canvas.top=0
		canvas.style.position='absolute'
		canvas.style.left=0+'px'
		canvas.style.top=0+'px'
	}else{
		canvas.style.width=ww*window.innerHeight/wh+'px'
		canvas.style.height=window.innerHeight+'px'
		canvas.width=ww*window.innerHeight/wh
		canvas.height=window.innerHeight
		canvas.style.position='absolute'
		canvas.style.left=(window.innerWidth-canvas.width)/2+'px'
		canvas.style.top=0+'px'
		
	}
	ctx.restore()

	if(window.innerHeight/window.innerWidth>=wh/ww){
		ctx.scale(window.innerWidth/ww,window.innerWidth/ww)
	}else{
		ctx.scale(window.innerHeight/wh,window.innerHeight/wh)
	}
	
	
}
function get_p_in_world(x,y){
	let fx=(x-parseFloat(canvas.style.left))*ww/canvas.width
	let fy=(y-parseFloat(canvas.style.top))*ww/canvas.width
	return [fx,fy]
}