const emailsInput = (function () {
    let eiCount = 0,
      eiItemCount = 0,
      hasNotificationBox = false,
      eiItemsArr = [];

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function getEiValidItemsCount() {
      const validEiItemsCount = eiItemsArr.filter(
        (eiItem) => eiItem.isValid
      ).length;
      return validEiItemsCount;
    }
    function addEiNotificationBox() {
      if (hasNotificationBox) return false;
      let eiNotificationBoxElement = document.createElement("div");
      eiNotificationBoxElement.classList.add("ei_notification_box");
      document.body.insertAdjacentElement(
        "beforeend",
        eiNotificationBoxElement
      );
    }
    function deleteEiItemData(eiItemId) {
      const newEiItemsArr = eiItemsArr.filter(
        (eiItem) => eiItem.id !== eiItemId
      );
      eiItemsArr = newEiItemsArr;
    }
    function deleteEiItemElement() {
      let eiId = this.getAttribute("data-ei-id");
      deleteEiItemData(eiId);
      this.parentElement.remove();
    }

    function addTestEiItem() {
      let eiItemEmail = "ei_sample" + eiItemCount + "@emailsInput.test";
      return createEiItem(eiItemEmail);
    }

    function createEiItem(email) {
      if (email == null || typeof email !== "string" || email.trim() === "")
        return false;
      eiItemCount += 1;
      let eiItemId = "ei_" + eiCount + "_" + eiItemCount,
        isValid = validateEmail(email);
      let eiItemInfo = {
        id: eiItemId,
        email: email,
        isValid: isValid,
      };

      eiItemsArr.push(eiItemInfo);
      let eiItemElement = document.createElement("div"),
        eiCrossElement = document.createElement("div"),
        eiEmailElement = document.createElement("div");
      eiItemElement.classList.add("ei_item");
      eiCrossElement.classList.add("ei_cross");
      eiEmailElement.classList.add("ei_email");
      eiItemElement.setAttribute("data-ei-id", eiItemId);
      eiEmailElement.innerHTML = isValid ? email : "invalid email";
      !isValid && eiItemElement.classList.add("ei_invalid_item");
      eiCrossElement.addEventListener("click", deleteEiItemElement);
      eiItemElement.insertAdjacentElement("afterbegin", eiCrossElement);
      eiItemElement.insertAdjacentElement("beforeend", eiEmailElement);
      return eiItemElement;
    }

    function init(options) {
      eiCount += 1;
      const {
        container,
        position,
        addRandomButtonContent,
        showCountButtonContent,
      } = options;
      let eiContainerElement = document.createElement("div"),
        eiInputContainerElement = document.createElement("div"),
        eiInputFocusLineElement = document.createElement("div"),
        eiButtonsContainerElement = document.createElement("div"),
        eiAddRandomButtonElement = document.createElement("div"),
        eiShowCountButtonElement = document.createElement("div");
      eiInputElement = document.createElement("input");
      eiContainerElement.classList.add("ei_container");
      eiInputContainerElement.classList.add("ei_input_container");
      eiInputFocusLineElement.classList.add("ei_input_focus_line");
      eiInputElement.setAttribute("type", "text");
      eiInputElement.setAttribute("placeholder", "Add New Email...");
      eiButtonsContainerElement.classList.add("ei_buttons_container");
      eiAddRandomButtonElement.classList.add("ei_button");
      eiShowCountButtonElement.classList.add("ei_button");
      eiShowCountButtonElement.innerHTML = showCountButtonContent;
      eiAddRandomButtonElement.innerHTML = addRandomButtonContent;
      eiAddRandomButtonElement.addEventListener("click", function () {
        let eiItemElement = addTestEiItem();
        this.parentElement.parentElement
          .querySelector(".ei_input_container")
          .insertAdjacentElement("beforebegin", eiItemElement);
      });
      eiShowCountButtonElement.addEventListener("click", function () {
        let eiValidEmailsCount = getEiValidItemsCount(),
          eiNotificationBoxElement = document.querySelector(
            ".ei_notification_box"
          );
        eiNotificationBoxElement.innerHTML =
          "there are " + eiValidEmailsCount + " valid emails";
        eiNotificationBoxElement.classList.remove(
          "ei_notification_box_out_animation"
        );
        eiNotificationBoxElement.classList.add(
          "ei_notification_box_in_animation"
        );
        setTimeout(function () {
          eiNotificationBoxElement.classList.remove(
            "ei_notification_box_in_animation"
          );
          eiNotificationBoxElement.classList.add(
            "ei_notification_box_out_animation"
          );
        }, 1000);
      });
      eiButtonsContainerElement.insertAdjacentElement(
        "afterbegin",
        eiAddRandomButtonElement
      );
      eiButtonsContainerElement.insertAdjacentElement(
        "beforeend",
        eiShowCountButtonElement
      );
      eiInputElement.addEventListener("paste", function (e) {
        let pastedEmails = (
          e.clipboardData || window.clipboardData
        ).getData("text");
        let pastedEmailsArray = pastedEmails.split(",");
        for (let i = 0; i < pastedEmailsArray.length; i++) {
          let eiItemElement = createEiItem(pastedEmailsArray[i]);
          if (!createEiItem) continue;
          this.parentElement.insertAdjacentElement(
            "beforebegin",
            eiItemElement
          );
        }
        event.preventDefault();
      });

      eiInputElement.addEventListener("keydown", function (e) {
        let keyCode = e.keyCode || e.which;
        if (keyCode !== 13) return false;
        let value = this.value;

        let eiItemElement = createEiItem(value);
        if (!eiItemElement) return false;
        this.parentElement.insertAdjacentElement(
          "beforebegin",
          eiItemElement
        );
        this.value = "";
      });
      eiInputContainerElement.insertAdjacentElement(
        "afterbegin",
        eiInputElement
      );
      eiInputContainerElement.insertAdjacentElement(
        "beforeend",
        eiInputFocusLineElement
      );
      eiContainerElement.insertAdjacentElement(
        "afterbegin",
        eiInputContainerElement
      );
      eiContainerElement.insertAdjacentElement(
        "beforeend",
        eiButtonsContainerElement
      );
      container.insertAdjacentElement(position, eiContainerElement);
      addEiNotificationBox();
      hasNotificationBox = true;
    }

    return {
      init,
    };
  })();