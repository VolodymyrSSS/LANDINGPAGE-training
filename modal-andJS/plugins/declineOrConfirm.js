$.declineOrConfirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      closable: false,
      content: options.content,
      onClose() {
        // hook to delete nodes in DOM-tree
        modal.destroy();
      },
      footerButtons: [
        {
          text: 'Cancel',
          color: 'secondary',
          handler() {
            console.log('Btn Cancel was clicked');
            modal.close();
            reject();
          },
        },
        {
          text: 'Remove',
          color: 'danger',
          handler() {
            console.log('Btn Remove was clicked');
            modal.close();
            resolve();
          },
        },
      ],
    });

    setTimeout(() => modal.open(), 100);
  });
};
