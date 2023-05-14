const App = {
  data() {
    return {
      title: "Notes",
      input: {
        value: "",
        placeholder: "Type ur text"
      },
      notes: [],
      editedText: "",
    }
  },

  mounted() {
    this.getNotes();
  },

  methods: {
    onSubmit() {
      this.notes.push({name: this.input.value, isEdited: false});
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

    getEdited(note, idx) {
      // Этот цикл служит для того, что бы, когда редактируется одна карточка и при клике на иконку редактирования другой карточки, текущая закрылась
      this.notes.forEach((item) => item.isEdited = false);
      note.isEdited = true;
      this.editedText = note.name;

      // Так не работает и всегда ошибка(
      // this.$refs.input.focus()

      this.$nextTick(() => {
        this.$refs.input[0].focus();
        // console.log(this.$refs.input[0]);
      })
    },

    acceptChanges(note, e) {
      // С помощью map прохожу по массиву заметок, нахожу ту, что мне нужна и меняю у нее name, тем самым изменяется массив и localStorage это видит и обновляется

      this.notes.map((item) => {
        if (item === note) {
          // item.name = e.target.value;
          item.name = this.editedText;
          item.isEdited = false;
        }
      });
      this.editedText = "";
    }
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

