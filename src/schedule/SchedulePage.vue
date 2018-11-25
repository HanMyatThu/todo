<template>
  <v-app id="keep" white>

    <!-- Left Navbar -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      app
     >
      <v-list
        dense
      
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
      <span class="title ml-3 mr-5">To-Do</span>
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
    <v-content dark>
        <template>
        <v-card class="mx-auto" sm12 md12 xs12>
            <v-card flat dark>   
                <v-card-title class="pa-2 teal lighten-3">
                    <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                    </v-btn>
                    <h3 class="title font-weight-light text-xs-center grow">Reminder</h3>
                <v-avatar>
                    <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
                </v-avatar>
                </v-card-title>
            <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn
            absolute
            bottom
            color="pink"
            right
            slot="activator"
            fab>
        <v-icon>add</v-icon>
        </v-btn>
        <v-card color="grey">
          <v-flex xs12 sm12 md12>
          <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat  color="white">
            <v-card-title primary-title>
              <h2>Create New Reminder</h2>
            </v-card-title>
            <v-form>
            <v-layout wrap row class="mt-3">
              <v-flex xs4 md2 sm2>
                <v-subheader>Title</v-subheader>
              </v-flex>
              <v-flex xs8 md10 sm10>
                <v-text-field 
                  name="Title" 
                  label="Title"
                  required>
              </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-3">
            <v-flex xs12 sm6 md6>
              <v-menu
                :close-on-content-click="false"
                v-model="menu1"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px">
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Picker without buttons"
                  prepend-icon="event"
              readonly>
            </v-text-field>
            <v-date-picker v-model="date" @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs11 sm5 md5>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="menu2"
              :nudge-right="40"
              :return-value.sync="time"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px">
            <v-text-field
              slot="activator"
              v-model="time"
              label="Picker in menu"
              prepend-icon="access_time"
              readonly>
            </v-text-field>
            <v-time-picker
              v-if="menu2"
              v-model="time"
              full-width
              @change="$refs.menu.save(time)">
            </v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-4">
          <v-flex xs4 sm2 md2>
            <v-subheader>Day Repeat</v-subheader>
          </v-flex>
          <v-flex xs8 sm4 md4>
            <v-select
              :items="select1"
              v-model="e1"
              menu-props="auto"
              label="Select Option"
              hide-details
              single-line>
            </v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs4 sm2 md2>
            <v-subheader color="red accent-3">Once/Repeat</v-subheader>
          </v-flex>
          <v-flex xs8 sm4 md4>
            <v-select
              :items="select2"
              v-model="e2"
              menu-props="auto"
              label="Select Option"
              hide-details
              single-line>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-4">
          <v-flex xs4 sm2 md2>
            <v-subheader color="red accent-3">Once/Repeat</v-subheader>
          </v-flex>
          <v-flex xs8 sm4 md4>
            <v-select
              :items="select3"
              v-model="e3"
              menu-props="auto"
              label="Select Option"
              hide-details
              single-line>
            </v-select>
          </v-flex>
        </v-layout>  
        <v-spacer></v-spacer>
        <v-layout row wrap class="mt-3">
          <v-flex xs12 md12 sm12>
            <color-picker @colorPicked="selectColor" :color="event.cssClass" />
          </v-flex> 
        </v-layout>
        <v-card-actions>
            <v-flex align-center justify-center>
              <v-btn color="error" round @click="dialog = false">Close</v-btn>
              <v-btn color="info" round @click="dialog = false">Save</v-btn>
            </v-flex>
        </v-card-actions>
      </v-form>
          </v-card>
        </v-container>
      </v-flex> 
      
      </v-card>
    </v-dialog>
      
      <!-- Calendar here -->
      <v-card-body>
          <v-date-picker v-model="picker2.date" 
            full-width no-title>
        </v-date-picker>
      </v-card-body>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline
        align-top
        dense
      >
        <v-timeline-item
          color="pink"
          small
        >
          <v-layout pt-3>
            <v-flex xs3>
              <strong>5pm</strong>
            </v-flex>
            <v-flex>
              <strong>New Icon</strong>
              <div class="caption">Mobile App</div>
            </v-flex>
            <v-flex xs3 sm3 md3 align-start justify-end>
                 <v-switch
              v-model="ex11"
              label="red"
              color="red"
              value="red"
              hide-details
            ></v-switch>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>3-4pm</strong>
            </v-flex>
            <v-flex>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">Hangouts</div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>

                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-flex>
            <v-flex xs3 sm3 md3 align-start justify-end>
                 <v-switch
              v-model="ex11"
              label="red"
              color="red"
              value="red"
              hide-details
            ></v-switch>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="pink"
          small
        >
          <v-layout pt-3 row wrap>
            <v-flex xs3 sm3 md3>
              <strong>12pm</strong>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <strong>Lunch break</strong>
            </v-flex>
            <v-flex xs3 sm3 md3 align-start justify-end>
                 <v-switch
              v-model="ex11"
              label="red"
              color="red"
              value="red"
              hide-details
            ></v-switch>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item
          color="teal lighten-3"
          small
        >
          <v-layout pt-3>
            <v-flex xs3>
              <strong>9-11am</strong>
            </v-flex>
            <v-flex>
              <strong>Finish Home Screen</strong>
              <div class="caption">Web App</div>
            </v-flex>
            <v-flex xs3 sm3 md3 align-start justify-end>
                 <v-switch
              v-model="ex11"
              label="red"
              color="red"
              value="red"
              hide-details
            ></v-switch>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
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
    <v-footer color="teal accent-4" app inset>
        <span  class="white--text text-md-center">&copy; 2017</span>
    </v-footer>


  </v-app>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import DatePicker from 'vuejs-datepicker';
import format from 'date-fns/format';
import ColorPicker from '../components/ColorPicker';
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
        }),
         async handleSubmit(){
          const start = format(this.event.start, 'YYYY-MM-DD');
          const end = format(this.event.end, 'YYYY-MM-DD');
          const event = {
            ...this.event,
            start,
            end
          }
          const req = await fetch('http://localhost:4000/schedule', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
              'content-type': 'application/json'
            }
          });
          const res = await req.json();
          this.resetValues();
        },
        selectColor(color){
          this.event = {
            ...this.event,
            cssClass: color
          }
        },
        resetValues(){
          this.event = {
            title: '',
            start: '',
            end: '',
            cssClass: '',
            data: {
              description: ''
            }
          }
        }
        
    },
     data: () => ({
      drawer: null,
      drawerRight: true,
      dialog: false,
      todaydate: new Date().getDate(),  
      left: null,  
      picker2:[ {
          date: new Date().toISOString().substr(0, 10),
          todayDate: new Date().getDate(),
      }],
      select1: ['All Day', 'Repeat', 'Friday', 'Saturday'],
      select2: ['Once', 'Repeat'],
      select3: ['15 Minutes', '30 Minutes','1 hour','2 hour'],
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu1: false,
      time: null,
      menu2: false,
      e1: 'Choose Option',
      e2: 'Choose Option',
      e3: 'Choose option',  
      pages: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star'
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant'
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-airballoon'
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer'
        }
      ]
    ,
       event: {
            title: '',
            start: '',
            end: '',
            cssClass: '',
            data: {
              description: ''
            }
            },
      items: [
        { icon: 'lightbulb_outline', text: 'Notes' , link: 'label' },
        { icon: 'touch_app', text: 'Reminders' , link: 'label' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'add', text: 'Create new label' , link: 'label' },
        { divider: true },
        { icon: 'archive', text: 'Archive'  , link: 'label'},
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

    }),
    props: {
      source: String
    },
    components: {
        DatePicker,
        ColorPicker
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