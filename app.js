'use strict';
// Educational demo: no real banking authentication, accounts, or biometric APIs.
const $ = id => document.getElementById(id);
const COPY = {
 en:{welcome:'Welcome to Loti Easy',choose:'What would you like to do?',balance:'Check practice balance',send:'Practice sending money',help:'Get help',back:'Back to home',continue:'Continue',verify:'Choose a practice verification method'},
 st:{welcome:'Rea u amohela ho Loti Easy',choose:'U batla ho etsa eng?',balance:'Sheba chelete ea mohlala',send:'Ithute ho romela chelete',help:'Fumana thuso',back:'Khutlela qalong',continue:'Tsoela pele',verify:'Khetha mokhoa oa ho netefatsa oa boitlhakiso'}
};
const state={screen:'home',task:'balance',method:null,errors:0,started:0,trialDone:false,active:false,records:[],savedMethods:new Set()};
function t(k){return COPY[$('language').value][k]||COPY.en[k]}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function setScreen(screen){state.screen=screen;render();$('main').focus()}
function home(){state.method=null;state.trialDone=false;setScreen('home')}
function task(which){state.task=which;setScreen('task')}
function begin(method){state.method=method;state.errors=0;state.started=performance.now();state.trialDone=false;setScreen(method==='code'?'code':'biometric')}
function completed(){state.trialDone=true;setScreen('done')}
function render(){
 const m=$('main');let html='';
 switch(state.screen){
 case 'home':html=`<div class="eyebrow">Accessible banking · practice</div><h1>${t('welcome')}</h1><p>${t('choose')}</p><div class="stack"><button class="task" data-action="balance">${t('balance')}</button><button class="task secondary" data-action="send">${t('send')}</button><button class="task secondary" data-action="help">${t('help')}</button></div>`;break;
 case 'task':html=`<div class="eyebrow">Practice task</div><h1>${state.task==='balance'?'Check your practice balance':'Practice money transfer'}</h1><p>${state.task==='balance'?'You will see a fictional balance after a practice verification step.':'This example uses a fictional transfer of M 20.00 to a fictional recipient. No money will move.'}</p><button data-action="choose">${t('continue')}</button><div class="row"><button class="secondary" data-action="home">${t('back')}</button></div>`;break;
 case 'choose':html=`<div class="eyebrow">Usability comparison</div><h1>${t('verify')}</h1><p>Both options are demonstrations, not real security methods.</p><div class="stack"><button data-action="code">A · Enter a practice code</button><button class="secondary" data-action="biometric">B · Simulate fingerprint confirmation</button><button class="secondary" data-action="home">${t('back')}</button></div>`;break;
 case 'code':html=`<div class="eyebrow">Version A · mock code</div><h1>Enter the practice code</h1><p>Read the six digits in the practice box and type them below. Never enter a real bank code.</p><div class="practice">Practice code: <span aria-label="four eight two nine one six">482916</span></div><label for="codeInput">Six-digit practice code</label><input id="codeInput" class="code" type="text" inputmode="numeric" autocomplete="off" maxlength="6" pattern="[0-9]{6}" aria-describedby="codeHint codeError"><p id="codeHint" class="small">Only the practice code shown above will work.</p><p id="codeError" class="error" role="alert"></p><button data-action="submitCode">Check practice code</button><div class="row"><button class="secondary" data-action="choose">Change method</button></div>`;break;
 case 'biometric':html=`<div class="eyebrow">Version B · simulated biometric</div><h1>Confirm it's you (practice)</h1><p>Imagine using your phone's fingerprint or face unlock. This demonstration does not read or store any biometric information.</p><div class="finger" aria-hidden="true">◎</div><button data-action="simulate">Simulate successful verification</button><div class="row"><button class="secondary" data-action="choose">Use another method</button></div>`;break;
 case 'done':html=`<div class="eyebrow">Practice complete</div><h1 class="success">✓ Verification demonstration complete</h1>${state.task==='balance'?'<div class="balance"><div>Fictional available balance</div><div class="amount">M 1,250.00</div></div>':'<div class="balance"><strong>Fictional transfer: M 20.00</strong><p>Recipient: Practice Person</p></div>'}<p>No real account was accessed and no money was transferred.</p><div class="stack"><button data-action="choose">Try the other verification method</button><button class="secondary" data-action="home">Return home</button></div>`;break;
 case 'help':html=`<h1>Help and safety</h1><p>This is a practice app. Use only the example code displayed here. Never share your real PIN, password or one-time banking code with anyone.</p><p>Use Back or Return home to navigate. You can enlarge text in Display settings.</p><button data-action="home">${t('back')}</button>`;break;
 }
 m.innerHTML=html;
}
$('main').addEventListener('click',e=>{
 const btn=e.target.closest('button[data-action]');if(!btn)return;
 switch(btn.dataset.action){
 case 'balance':case 'send':task(btn.dataset.action);break;
 case 'home':home();break;
 case 'help':setScreen('help');break;
 case 'choose':setScreen('choose');break;
 case 'code':case 'biometric':begin(btn.dataset.action);break;
 case 'simulate':completed();break;
 case 'submitCode':{
 const val=$('codeInput').value.trim();
 if(val==='482916'){completed()}else{state.errors++;$('codeError').textContent='That does not match the practice code. Please try again.';$('codeInput').setAttribute('aria-invalid','true');$('codeInput').focus()}
 break;
 }
 }
});
$('main').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='codeInput'){$('main').querySelector('[data-action="submitCode"]').click()}});
$('largeText').addEventListener('change',e=>document.body.classList.toggle('large',e.target.checked));
$('highContrast').addEventListener('change',e=>document.body.classList.toggle('contrast',e.target.checked));
$('language').addEventListener('change',render);
$('researchMode').addEventListener('change',e=>{$('researchPanel').hidden=!e.target.checked});
$('startTest').addEventListener('click',()=>{
 const id=$('participant').value.trim();if(!id){$('testStatus').textContent='Enter an anonymous participant ID first.';return}
 state.active=true;state.savedMethods=new Set();state.method=null;state.trialDone=false;
 $('testStatus').textContent=`Test started for ${id}. Order: ${$('order').value}. Choose a task on the home screen.`;home();
});
$('saveTrial').addEventListener('click',()=>{
 if(!state.active){$('testStatus').textContent='Start a test first.';return}
 if(!state.method||!state.started){$('testStatus').textContent='Complete or attempt a verification method before saving.';return}
 if(state.savedMethods.has(state.method)){$('testStatus').textContent='This method is already saved for this participant. Start a new test for a new session.';return}
 const elapsed=Math.round((performance.now()-state.started)/1000);
 state.records.push({participant:$('participant').value.trim(),order:$('order').value,task:state.task,method:state.method,completed:state.trialDone,seconds:elapsed,errors:state.errors,assistance:$('assistance').value,ease:$('ease').value,understood:$('understood').value,preference:$('preference').value});
 state.savedMethods.add(state.method);$('recordCount').textContent=`${state.records.length} saved trial(s).`;
 $('testStatus').textContent=`Saved ${state.method} trial. ${state.savedMethods.size===2?'Both methods recorded.':'Now try the other method.'}`;
 $('ease').value='';$('assistance').value='none';$('understood').value='unknown';
});
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"'}
$('exportCsv').addEventListener('click',()=>{
 if(!state.records.length){$('testStatus').textContent='No trials to export.';return}
 const keys=['participant','order','task','method','completed','seconds','errors','assistance','ease','understood','preference'];
 const csv=[keys.join(','),...state.records.map(r=>keys.map(k=>csvCell(r[k])).join(','))].join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='loti-easy-usability-results.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('clearData').addEventListener('click',()=>{
 if(!confirm('Delete all trial data in this browser tab? Export first if needed.'))return;
 state.records=[];state.active=false;state.savedMethods=new Set();$('participant').value='';$('recordCount').textContent='0 saved trials.';$('testStatus').textContent='Research data cleared.';
});
document.body.classList.add('large');render();
