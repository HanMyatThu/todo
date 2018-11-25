<template>
  <v-app id="keep">

    <!-- Left Navbar -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
     >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              
                 <v-subheader v-if="item.heading">
                {{ item.heading }}
                </v-subheader>
              
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile
            v-else
            :key="i"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <router-link :to="item.link">
              <v-list-title>
                {{ item.text }}
              </v-list-title>
            </router-link>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    
      <!-- Top ToolBar -->
    <v-toolbar color="teal darken-3" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">GG</span>
      <v-text-field
        append-icon="search"
        class="mx-4"
        label="Search"
        color="black"
        prepend-inner-icon="search"
       
        >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon right fixed accent @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>


    <!-- Content -->
    <v-content>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex d-flex xs 12 sm8 md8 offset-md2>
                <v-text-field
                v-model="newTodo"
                id="newTodo"
                name="newTodo"
                @keyup.enter="addTodo"
                label="Take a note..."
                type="text"
                append-icon="note"
                clearable
                outline
                >        
                </v-text-field>
            </v-flex>
          </v-layout>

          <v-divider></v-divider>

          <v-list two-line subheader>
            
            <v-subheader class="subheading" v-if="todos.length == 0">You have 0 Tasks, add some</v-subheader>
              <v-subheader class="subheading">Your Tasks</v-subheader>
                <div v-for="todo in todos" :key="todo.id">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-if="!todo.done" v-model="todo.done"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title :class="{
                        done: todo.done
                        }" class="title">{{todo.title}}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>Added on: {{date}}{{ord}} {{day}} {{year}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-btn icon ripple color="red" @click="removeTodo(i)">
                      <v-icon>close</v-icon>
                        </v-btn>
                  </v-list-tile>
                </div>
          </v-list>
        

          </v-container>
      </v-content>




  
  
  
  
  
  
  
    <!--  Right Navbar -->
    <v-navigation-drawer
        fixed
        v-model="drawerRight"
        right
        clipped
        app
      >
        <div class="hidden-sm-and-down">
        <router-link to="/login"> 
           <v-btn color="success" round style="text-decoration:none;">
          Logout
        </v-btn>
        </router-link>
         <v-switch
              v-model="ex11"
              label="red darken-3"
              color="red darken-3"
              value="red darken-3"
              hide-details
            ></v-switch>
      </div>
    </v-navigation-drawer>

    
    


     <!-- footer -->
    <v-footer color="teal darken-3" app inset>
        <span  class="white--text text-md-center">&copy; 2017</span>
    </v-footer>


  </v-app>
</template>


<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            account: state => state.account,
            users: state => state.users.all
        })
    },
    created () {
        this.getAllUsers();
    },
    methods: {
        ...mapActions('users', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        })
    },
     data: () => ({
      drawer: null,
      drawerRight: true,
      left: null,  
      items: [
        { icon: 'lightbulb_outline', text: 'Notes' , link: 'label' },
        { icon: 'touch_app', text: 'Reminders' , link: 'label' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'add', text: 'Create new label' , link: 'label' },
        { divider: true },
        { icon: 'archive', text: 'Schedule'  , link: 'label'},
        { icon: 'delete', text: 'Trash' , link: 'label' },
        { divider: true },
        { icon: 'settings', text: 'Settings' , link: 'label' },
        { icon: 'chat_bubble', text: 'Trash'  , link: 'label'},
        { icon: 'help', text: 'Help' },
        { icon: 'phonelink', text: 'App downloads' , link: 'label'},
        { icon: 'keyboard', text: 'Keyboard shortcuts' , link: 'label' }
      ],
      newTodo: '',
      todo: [],
      todos: [],
      // day: this.todoDay(),
      // date: new Date().getDate(),
      // ord: this.nth(new Date().getDate()),
      // year: new Date().getFullYear(),
    }),
    props: {
      source: String
    },
     methods: {
    addTodo() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    todoDay() {
      var d = new Date();
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      return days[d.getDay()];
    },
    nth(d) {
      if(d>3 && d<21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    },
  } 
};
</script>



<style scoped>

  #keep main .container {
    height: 660px;
  }

  .navigation-drawer__border {
    display: none;
  }

  .text {
    font-weight: 400;
  }
  .header{
  margin-top: 100px;
}
.done {
      text-decoration: line-through;
    }
</style>