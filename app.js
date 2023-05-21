import { getTrimString, getStringLength } from "./utils.js";

const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur text"
      },
      notes: [],
      editingItem: null,
      errorInput: false,
    }
  },

  mounted() {
    this.getNotes();
  },

  methods: {
    onSubmit() {
      this.editingItem = null;

      this.notes.push({name: getTrimString(this.input.value)});
      this.input.value = "";
    },

    remove(note) {
      this.notes = this.notes.filter((item) => item !== note);
    },

    getNotes() {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        this.notes = JSON.parse(localNotes);
      }
    },

    getEdited(note) {
      this.editingItem = note;

      this.$nextTick(() => {
        this.$refs.input[0].focus();
      })
    },

    getAcceptChanges(note) {
      if (!getStringLength(note.name)) {
        this.errorInput = true;
        return;
      }

      this.errorInput = false;
      const index = this.notes.findIndex(item => item === note);
      if (index > -1) {
        this.editingItem.name = getTrimString(this.editingItem.name);
        this.notes[index] = this.editingItem;
      }
      this.editingItem = null;
      return this.notes;
    },
  },

  watch: {
    notes: {
      handler(val) {
        localStorage.setItem("notes", JSON.stringify(val));
      },
      deep: true,
    }
  }
}

Vue.createApp(App).mount("#app");

