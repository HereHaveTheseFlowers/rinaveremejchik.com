export default function delegate(sel: string, evt: keyof HTMLElementEventMap, handler: ()=>void) {
    const els = document.querySelectorAll(sel);
    if(!els[0]) return;
    for(const el of els) {
        el.addEventListener(evt, function(event) {
            let t = event.target as HTMLElement;
            while (t) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                if(t !== this) return;
                t = t.parentNode as HTMLElement;
            }
        });
    }
}