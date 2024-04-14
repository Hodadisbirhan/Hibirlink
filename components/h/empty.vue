<template>
  <section
    class="w-full h-full flex-1 flex flex-col items-center justify-center"
  >
    <slot name="image">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0,0,256,256"
      >
        <g
          fill="#477eeb"
          fill-rule="nonzero"
          stroke="none"
          stroke-width="1"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          style="mix-blend-mode: normal"
        >
          <g transform="scale(10.66667,10.66667)">
            <path
              d="M23,5c0,-2.209 -1.791,-4 -4,-4c-1.862,0 -3.413,1.278 -3.859,3h-10.141c-1.657,0 -3,1.343 -3,3v8c0,1.657 1.343,3 3,3h14c1.657,0 3,-1.343 3,-3v-7.38c0.615,-0.703 1,-1.612 1,-2.62z"
              opacity="0.35"
            ></path>
            <path
              d="M21.5,17c-0.386,0 -18.614,0 -19,0c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5c0.386,0 18.614,0 19,0c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5z"
            ></path>
            <path
              d="M19,0c-2.76,0 -5,2.24 -5,5c0,2.76 2.24,5 5,5c2.76,0 5,-2.24 5,-5c0,-2.76 -2.24,-5 -5,-5zM18.16,2.06c0,-0.46 0.38,-0.84 0.84,-0.84c0.46,0 0.84,0.38 0.84,0.84v3.39c0,0.46 -0.38,0.84 -0.84,0.84c-0.46,0 -0.84,-0.38 -0.84,-0.84zM19,9c-0.77,0 -0.92,-0.7 -0.92,-0.98c0,-0.26 0.17,-0.98 0.92,-0.98c0.74,0 0.92,0.72 0.92,0.98c0,0.28 -0.16,0.98 -0.92,0.98z"
            ></path>
          </g>
        </g>
      </svg>
    </slot>
    <h4 :class="['font-extrabold text-neutral300 text-xl', contentClass]">
      {{ $t(content) }}
    </h4>
    <slot name="action"></slot>
  </section>
</template>
<script setup lang="ts">
interface Input {
  content: string;
  contentClass?: string;
}

const props = defineProps<Input>();
</script>
