<template>
    <section class="slider-container">
        <div class="slider" :data-sliders-count="JSON.parse(product.images).length">
            <div class="switchers">
                <span :class="[sIndex == 0 ? 'active' : '']" v-for="(x, sIndex) in JSON.parse(product.images).length"></span>
            </div>
            <div :class="['slide', index == 0 ? 'active' : '']" :data-slide-count="index + 1" v-for="(slide, index) in JSON.parse(product.images)">
                <div class="img">
                    <img :src=slide>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    const { product } = defineProps(['product']);

    onMounted(() => {

        const slider = document.querySelector('.slider-container .slider');
        const slideHeight = slider.offsetHeight;
        let currentSlide = 0;
        let isScrolling;

        function changeCurrentSlide(el) {
            currentSlide = Math.floor(el.scrollTop / slideHeight);
        }

        function removeActive() {
            Array.from(slider.children[0].children).forEach(el => {
                el.classList.remove('active');
            });
        }

        function addActive() {
            slider.children[0].children[currentSlide].classList.add('active');
        }

        slider.addEventListener('scroll', function() { 
            clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                changeCurrentSlide(this);
                removeActive();
                addActive();
            }, 150);
        });

    });

</script>

<style lang="scss" scoped>

    @use '~/scss/helpers/colors' as colors;

    .slider-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .slider {
            &::-webkit-scrollbar {
               display: none;
            }
            -ms-overflow-style: none;
            scrollbar-width: none;
            position: relative;
            height: 100%;
            min-width: 100%;
            display: flex;
            flex-direction: column;
            overflow: auto;
            scroll-snap-type: y mandatory;
            .switchers {
                position: sticky;
                padding: 7px;
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 4px;
                > span {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: #ccc;
                    cursor: pointer;
                    &.active {
                        background-color: colors.$color-colored-2;
                    }
                }
            }
            .slide {
                scroll-snap-align: start;
                width: 100%;
                flex: 0 0 100%;
                height: 100%;
                > .img {
                    width: 100%;
                    height: 100%;
                    > img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }

</style>