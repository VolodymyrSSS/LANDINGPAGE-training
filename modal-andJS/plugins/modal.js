Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling);
};

$.modal = function (options) {
  const $modal = _createModal(options);
  const ANIMATION_SPEED = 200;
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }
      !closing && $modal.classList.add('open');
    },
    close() {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('close');
      setTimeout(() => {
        $modal.classList.remove('close');
        closing = false;
        // hook to delete nodes in DOM-tree
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, ANIMATION_SPEED);
    },
    // to remove whole modal, clean and save memory
    destroy() {
      destroyed = true;
      // to remove elements from DOM-tree
      $modal.parentNode.removeChild($modal);
      // to remove eventListener
      $modal.removeEventListener('click', listener);
    },
    // setContent(html), -> you can put this method here or use Object.assign
  };

  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listener);

  function _createModalFooter(buttons = []) {
    if (buttons === 0) {
      return document.createElement('div');
    }

    const btnWrap = document.createElement('div');
    btnWrap.classList.add('modal-footer');

    function noop() {}

    buttons.forEach((btn) => {
      const $btn = document.createElement('button');
      $btn.textContent = btn.text;
      $btn.classList.add('btn');
      $btn.classList.add(`btn-${btn.color || 'secondary'}`);
      $btn.onclick = btn.handler || noop;
      btnWrap.appendChild($btn);
    });

    return btnWrap;
  }

  function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('v-modal');
    modal.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="modal-overlay" data-close="true">
          <div class="modal-window" style="width: ${
            options.width || DEFAULT_WIDTH
          }">
            <div class="modal-header">
              <span class="modal-title">${
                options.title || 'Here is TITLES'
              }</span>
              ${
                options.closable
                  ? `<span class="modal-close" data-close="true">&times;</span>`
                  : ''
              }
            </div>
            <div class="modal-body" data-content>
              ${options.content || ''}
            </div>
          </div>
        </div>
      `
    );

    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));

    document.body.appendChild(modal);
    return modal;
  }

  return Object.assign(modal, {
    // expand methods: adding setContent method into modal
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    },
  });
};
