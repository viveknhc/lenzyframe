$(document).ready(function(){var loaders=[{width:100,height:100,stepsPerFrame:4,trailLength:1,pointDistance:.01,fps:22,fillColor:'#8E44AD',step:function(point,i,f){var progress=point.progress,degAngle=360*progress,angle=Math.PI/180*degAngle,angleB=Math.PI/180*(degAngle-180),size=i*5;this._.fillRect(Math.cos(angle)*35+(50-size/2),Math.sin(angle)*25+(50-size/2),size,size);this._.fillStyle='#2980B9';this._.fillRect(Math.cos(angleB)*25+(50-size/2),Math.sin(angleB)*35+(50-size/2),size,size);if(point.progress==1){this._.globalAlpha=f<.5?1-f:f;this._.fillStyle='#F1C40F';this._.beginPath();this._.arc(50,50,5,0,360,0);this._.closePath();this._.fill();}},path:[['line',40,10,60,90]]},];var d,a,loader_container=document.getElementById('in');for(var i=-1,l=loaders.length;++i<l;){d=document.createElement('div');d.className='l';a=new Sonic(loaders[i]);d.appendChild(a.canvas);loader_container.appendChild(d);a.play();}});