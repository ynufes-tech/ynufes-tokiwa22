<script setup>
import data from "@/assets/events.json"
import StarTitle from "@/components/StarTitle";

const props = defineProps({
  eventId: {
    type: Number,
    required: true
  }
})

const eventData = data.find((d) => d.event_id === props.eventId)

function getPlaceName(e) {
  let place_name = "";
  switch (e.event_place_id) {
    case "AB":
    case "CD":
    case "EF":
      place_name = "メインストリート";
      break;
    case "H":
      place_name = "大学会館周辺";
      break;
    case "ED":
      place_name = "教育学部講義棟6号館"
      break;
    case "KK":
      place_name = "経済経営学部講義棟1号館";
      break;
    case "T":
      place_name = "都市科学部講義棟";
      break;
    case "Y":
      place_name = "野外音楽堂";
      break;
    case "Z":
      place_name = "その他"
  }
  return place_name + e.event_pamphlet_id
}

const showNoImage = function (e) {
  e.target.onerror = null;
  e.target.src = '/data/icons/events/noimage.png'
}
</script>
<template>
  <div class="root-wrapper">
    <div class="event-detail fade-up">
      <div class="event-detail-title">
        <div class="org-name" v-text="eventData.org_name">
        </div>
        <h1 class="event-title allow-wrap" v-text="eventData.event_title">
        </h1>
        <div class="event-place">
          <div v-if="!eventData.t28 && !eventData.t29 && !eventData.t30">
            日時： 全日
          </div>
          <div class="date-table" v-if="eventData.t28 || eventData.t29 || eventData.t30">
            <div>日時：</div>
            <table>
              <tr v-if="eventData.t28">
                <td>28日</td>
                <td v-text="eventData.t28"/>
              </tr>
              <tr v-if="eventData.t29">
                <td>29日</td>
                <td v-text="eventData.t29"/>
              </tr>
              <tr v-if="eventData.t30">
                <td>30日</td>
                <td v-text="eventData.t30"/>
              </tr>
            </table>
          </div>
          場所：{{ getPlaceName(eventData) }}
        </div>
        <router-link to="/map" class="map-button">マップを見る</router-link>
      </div>
      <div class="event-detail-description">
        <div class="event-icon">
          <img :src="`/data/icons/events/`+eventData.event_id+`.webp`" @error="showNoImage">
        </div>
        <div class="event-description">
          <p class="allow-wrap" v-text="eventData.event_description"/>
        </div>
      </div>
      <div class="org-detail-description">
        <StarTitle title="団体紹介"/>
        <h3>{{ eventData.org_name }}</h3>
        <p class="allow-wrap" v-text="eventData.org_description">
        </p>
      </div>
      <div class="SNS">
        <!--        画像のダウンロード元のサイト（https://icon-rainbow.com/tag/sns/）-->
        <a :href="`https://facebook.com/` + eventData.sns_facebook" class="SNS-icon c-btn" target="_blank"
           v-show="eventData.sns_facebook"
           rel="noopener noreferrer">
          <img src="@/assets/sns/facebook_icon.png" alt="Facebookボタン">
        </a>
        <a :href="`https://twitter.com/` + eventData.sns_twitter" class="SNS-icon c-btn" target="_blank"
           v-show="eventData.sns_twitter"
           rel="noopener noreferrer">
          <img src="@/assets/sns/twitter_icon.png" alt="Twitterボタン">
        </a>
        <a :href="`https://instagram.com/` + eventData.sns_instagram" class="SNS-icon c-btn" target="_blank"
           v-show="eventData.sns_instagram" rel="noopener noreferrer">
          <img src="@/assets/sns/instagram_icon.png" alt="Instagramボタン">
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-table {
  display: flex;
  align-items: center;

  table {
    border-spacing: 10px;
  }
}

.map-button {
  font-size: 1.3rem;
  width: fit-content;
  border-radius: 1em;
  color: white;
  padding: 0.3em;
  margin: .3em 0 0 4em;
  border: solid white 1px;
  text-decoration: none;
}

.allow-wrap {
  white-space: pre-wrap;
}

.root-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  align-items: center;
  padding: 0 3rem;
  box-sizing: border-box;
  color: white;
}

.event-detail {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 50rem;
  padding: 5rem 0;
  background-size: contain;
}

.event-detail-title {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.event-title {
  font-size: 3.5rem;
  white-space: pre-wrap;
}

@media screen and (max-width: 41rem) {
  .event-title {
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 31rem) {
  .event-title {
    font-size: 1.6rem;
  }
  .root-wrapper {
    padding: 0 2rem;
  }
}

.event-place {
  line-height: 1.5;
  font-size: 1.5rem;
}

p {
  letter-spacing: 5px;
  line-height: 2;
  text-align: left;

  &::first-letter {
    font-size: 2em;
  }

  &::first-line {
    line-height: 1.5;
  }
}

.event-detail-description {
  display: flex;
  align-items: flex-start;
  padding-bottom: 100px;
  padding-top: 50px;
}

@media screen and (max-width: 700px) {
  .event-detail-description {
    display: block;
  }
  .event-icon {
    display: flex;

    > img {
      margin: 0 auto;
    }
  }
}

.event-icon > img {
  max-width: 400px;
  width: 50vw;
  padding: 1rem;
  flex: 1;
  aspect-ratio: 1;
}

.event-description {
  width: 100%;
  text-transform: capitalize;
  padding: 1rem;
}

.SNS {
  display: flex;
  justify-content: center;
  padding-top: 5rem;
}

.SNS-icon img {
  max-width: 100px;
  width: 40%;
  margin: 1rem;
}

.c-btn {
  transition: transform 0.2s;
}

.c-btn:hover {
  transform: scale(1.5, 1.5);

}

.org-detail-description {
  h3 {
    font-size: 2em;
  }

  .star-title {
    margin: 0 auto;
  }
}

</style>