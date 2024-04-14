<template>
  <div class="w-full h-full">
    <div
      id="map"
      class="w-full h-[100vh]"
      v-if="toTrackWithRealAddressLine"></div>
    <l-map
      v-else
      ref="mapRef"
      :options="{ zoomControl: false }"
      class="z-0 w-full"
      :maxZoom="maxZoom"
      :zoom="6"
      :minZoom="minZoom"
      :center="[center.lat, center.lng]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-control-zoom position="bottomright"></l-control-zoom>
      <l-control-scale
        position="topright"
        :imperial="true"
        :metric="false"></l-control-scale>
      <l-marker
        v-for="item in information"
        :key="item.id"
        :lat-lng="[item.lat, item.lng]">
        <l-icon
          :icon-size="[32, 34.0]"
          :icon-anchor="[item.lat, item.lng]"
          icon-url="data:image/jpeg;base64,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"></l-icon>
        <l-popup v-if="item?.popup">
          <slot
            name="popup"
            :popup="item.popup">
          </slot>
        </l-popup>
        <l-tooltip
          v-if="item.tooltip"
          :options="{
            permanent: item.isPersistenceTooltip,
            interactive: true,
          }">
          <slot
            name="tooltip"
            :tooltip="item.tooltip" />
        </l-tooltip>
      </l-marker>
      <l-polyline
        v-if="polyline"
        :latLngs="polyline"
        :color="polylineColor"
        class="h-[0.1px]">
        <l-marker
          v-for="(point, index) in polylinePoints"
          :key="index"
          :latLng="[point.lat, point.lng]">
          <l-popup>
            <slot
              name="popupPolyline"
              :popup_data="point.popup_info"></slot>
          </l-popup>

          <l-tooltip :options="{ permanent: false, interactive: true }">
            <slot
              name="tooltipPolyline"
              :tooltip_data="point.tooltip"></slot>
          </l-tooltip>
        </l-marker>
      </l-polyline>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import {
  LPolyline,
  LMap,
  LTileLayer,
  LCircle,
  LControlZoom,
  LMarker,
  LControlScale,
  LTooltip,
  LPopup,
  LIcon,
  LWmsTileLayer,
  LControl,
  LControlAttribution,
} from "@vue-leaflet/vue-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
//import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const mapRef = ref(null);
//const first_route = ref(L.latLng(11.6, 37));

onMounted(() => {
  const baseLayer = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "OSM",
      //'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );
  if (props.toTrackWithRealAddressLine) {
    const map = L.map("map", {
      center: [props.center.lat, props.center.lng],
      zoom: 7,
      zoomControl: true,
      layers: [baseLayer],
    });

    const waypoints = computed(() => {
      return props.polylinePoints?.map((element) => {
        return L.latLng(element.lat, element.lng);
      });
    });

    let control = L.Routing.control({
      plan: L.Routing.plan(waypoints.value, {
        createMarker: (i, wp) => {
          if (props.polylinePoints[i].icon) {
            return L.marker(wp.latLng, {
              draggable: false,

              icon: L.icon({
                iconUrl: props.polylinePoints[i].icon,
                iconSize: [20, 24],
              }),
            }).bindPopup(props.polylinePoints[i].popup_info.name);
          } else {
            return L.marker(wp.latLng, {
              draggable: false,
            }).bindPopup(props.polylinePoints[i].popup_info.name);
          }
        },
        draggableWaypoints: false,
      }),
      addWaypoints: false,

      show: true,
      collapsible: false,
      showAlternatives: true,
      autoRoute: true,

      alternativeClassName: "alternative",
      fitSelectedRoutes: true,
      router: L.Routing.osrmv1({
        serviceUrl: "http://router.project-osrm.org/route/v1",
        profile: "driving",
      }),
    });
    control.on("routeselected", function (e) {
      e.route.itinerary.createHTML = function () {};
    });
    if (props.toTrackWithRealAddressLine)
      control.addTo(map).on("click", (e) => {});
  }
});

interface CenterLocation {
  lat: number;
  lng: number;
}

interface Point {
  icon?: string;
  lng: number;
  lat: number;
  popup_info?: any;
  tooltip?: any;
}

interface InformationInterface {
  id?: number | string;
  lat: number;
  lng: number;
  icon?: string;
  tooltip?: any;
  isPersistenceTooltip: boolean;
  popup?: any;
}

interface PropsInterface {
  center: CenterLocation;
  information?: Array<InformationInterface>;
  maxZoom: number;
  minZoom?: number;
  polylinePoints?: Array<Point>;
  polylineColor?: string;
  toTrackWithRealAddressLine?: boolean;
}

const props = withDefaults(defineProps<PropsInterface>(), {
  toTrackWithRealAddressLine: false,
});

const polyline = computed(() => {
  if (props.polylinePoints?.length)
    return props.polylinePoints?.map((point) => {
      return [point.lat, point.lng];
    });

  return [];
});
</script>
<style scoped>
.leaflet-control-container .leaflet-routing-container-hide {
  display: none;
}
.alternative {
  background-color: blueviolet;
}
</style>
