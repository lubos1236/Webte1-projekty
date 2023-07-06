const template=document.createElement('template');
template.innerHTML= `
<style>@import url('./slider.css');</style>
<input type="range"/>
<input type="number"/>
<span class="value">1</span>`


class ValueSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.value =this.hasAttribute('value') ? this.getAttribute('value') : 1;
        this.max =this.hasAttribute('max') ? this.getAttribute('max') : 50;
        this.min =this.hasAttribute('min') ? this.getAttribute('min') : 1;
        this.step =this.hasAttribute('step') ? this.getAttribute('step') : 1;

        this.slider = this.shadowRoot.querySelector('input[type="range"]');
        this.num = this.shadowRoot.querySelector('input[type="number"]');
        this.val = this.shadowRoot.querySelector('.value');

        this.slider.addEventListener('input', this.onChange.bind(this));
        this.num.addEventListener('blur', this.onChange.bind(this));


        this.slider.value = this.value;
        this.slider.max = this.max;
        this.slider.min = this.min;
        this.slider.step = this.step;

        this.num.value = this.value;
        this.num.max = this.max;
        this.num.min = this.min;
        this.num.step = this.step;
    }
    setVisible(obj, visibility){
        if (obj==="slider"){
            this.slider.style.visibility= visibility?'visible' : 'hidden';
            this.val.style.visibility= visibility?'visible' : 'hidden';
        }
        else if (obj==="number")
            this.num.style.visibility= visibility?'visible' : 'hidden';
    }

    onChange(e) {
        let clamp=Math.min(Math.max(e.target.value, this.min), this.max);
        this.slider.value=clamp;
        this.num.value=clamp;
        this.val.innerHTML=clamp.toString();
        this.val.style.left = ((5+clamp*(this.max/this.min))*2.83+'px');
    }

}

customElements.define('value-slider', ValueSlider);
