<script setup>
import { ref } from 'vue'
import { omdbStore } from '../store/omdbStore'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const OMDBStore = new omdbStore()
const inputId = ref("")
const inputTitle = ref("")
const movies = ref([])
const filteredMovies = ref([])
const favoriteMovies = ref(new Set())
const filterbyFavorites = ref(false)

const onSearch = async () => {
  movies.value = await OMDBStore.getMovieById(inputId.value.split(","))
  filteredMovies.value = movies.value
  for (const movie of filteredMovies.value) {
    movie.isShown = false
  }
}

const onFilter = () => {
  filteredMovies.value = movies.value.filter((movie) => movie.Title.toLowerCase().includes(inputTitle.value.toLowerCase().trim()))
}

const toggleFavorite = (movie) => {
  if(favoriteMovies.value.has(movie.imdbID)) {
    favoriteMovies.value.delete(movie.imdbID)
  } else {
    favoriteMovies.value.add(movie.imdbID)
  }
}


</script>

<template>
  <div>
    <input v-model="inputId" required placeholder="Enter your film ID" class="inputText">
    
    <input v-model="inputTitle" @input="onFilter()"  placeholder="Filter by Title" class="inputText">

    <button @click="onSearch()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Search </button>

    <input type="checkbox" v-model="filterbyFavorites"> Filter by Favorites</input>
  </div>
  
  

  <ul>
    <li v-for="movie in filteredMovies" :key="movie.Title">
      <div v-if="!filterbyFavorites || favoriteMovies.has(movie.imdbID)">
        <h1 @click="movie.isShown = !movie.isShown" class="highlightCursor font-bold text-2xl">{{ movie.Title }}</h1>
        <input id="star1" class="star" type="checkbox" title="bookmark page" @click="toggleFavorite(movie)">
        <img :src = "movie.Poster" @click="movie.isShown = !movie.isShown" class="highlightCursor"/>
        <TransitionRoot as="template" :show="movie.isShown">
          <Dialog class="relative z-10" @close="movie.isShown = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ movie.Title }}</DialogTitle>
                          <div class="mt-2">
                            <p class="text-sm text-gray-500">
                            Actors : {{ movie.Actors }} <br>
                            Awards : {{ movie.Awards }} <br>
                            Movie Director : {{ movie.Director }} <br>
                            Language : {{ movie.Language }} <br>
                            Metascore : {{ movie.Metascore }} / 100<br></p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </li>
  </ul>

  
</template>

<style scoped>
  .highlightCursor {
    cursor:pointer;
  }
  .inputText{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
  }
  .searchResults{
    display: inline-block;
  }
  .star {
      visibility:hidden;
      font-size:30px;
      cursor:pointer;
  }
  .star:before {
    content: "\2606";
    position: absolute;
    visibility:visible;
  }
  .star:checked:before {
    content: "\2605";
    position: absolute;
  }
</style>
