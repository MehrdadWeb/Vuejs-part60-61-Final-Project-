Vue.createApp({
    data() {
        return {
            langs: ['php', 'js', 'c', 'c#'],
            formData: {
                name: '',
                message: '',
                checkbox: [],
                radio: '',
                lang: ''
            }
        }
    },
    methods: {
        submitForm() {
            console.log(this.formData);
        }
    }

}).mount('#app');