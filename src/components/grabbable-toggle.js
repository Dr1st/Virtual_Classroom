AFRAME.registerComponent("grabbable-toggle", {
  schema: {
    primaryReleaseEvents: { default: ["hand_release", "action_release"] },
    secondaryReleaseEvents: { default: ["secondary_hand_release", "secondary_action_release"] }
  },

  init() {
    this.toggle = false;
    this.onGrabEnd = this.onGrabEnd.bind(this);
    this.el.addEventListener("grab-end", this.onGrabEnd);
    this.el.classList.add("sticky");
  },

  remove() {
    this.el.removeEventListener("grab-end", this.onGrabEnd);
    this.el.classList.remove("sticky");
  },

  onGrabEnd(e) {
    const type = e.detail && e.detail.buttonEvent ? e.detail.buttonEvent.type : null;
    if ((this.isPrimaryRelease(type) && !this.toggle) || this.isSecondaryRelease(type)) {
      this.toggle = true;
      e.stopImmediatePropagation(); //prevents grabbable from calling preventDefault
    } else if (this.toggle && this.isPrimaryRelease(type)) {
      this.toggle = false;
    }
  },

  isPrimaryRelease(type) {
    return this.data.primaryReleaseEvents.indexOf(type) !== -1;
  },

  isSecondaryRelease(type) {
    return this.data.secondaryReleaseEvents.indexOf(type) !== -1;
  }
});
