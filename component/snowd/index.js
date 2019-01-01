// component/snowd/index.js

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value: 18,
            observer: function(nv, ov, cp) {}
        },
        bj: {
            type: String,
            value: 'default',
            observer: function(nv, ov, cp) {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        dxh: "data:image/gif;base64,R0lGODlhDAAMAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANgALAAAAAAMAAwAAAg1ALEJHAhgIEGCBQUmxFYQQEOGBiE6hGiwocOHChla1KjxosWLGT1SPDhxYUiQC1OmjDhyYEAAOw==",
    },
    ready() {
        let that = this;
        let animationDatas = []
        let count = this.data.count;
        // console.log(count)
        for (let i = 0; i < count; i++) {
            animationDatas.push('');
            setTimeout(function() {
                let anobj = that.animatobj(i)
                that.donghua(anobj)
            }, 450 * i)
        }
        that.setData({
            animationDatas: animationDatas
        })
    },
    detached() {
        let that = this;
        that.setData({
            stop: true
        })
        let animationDatas = that.data.animationDatas;
        for (let i = 0; i < animationDatas.length; i++) {
            clearTimeout(animationDatas[i]['setim']);
        }
    },
    pageLifetimes: {
        show() {
            let that = this;
            if (!that.data.stop) return
            that.setData({
                stop: false
            })
            let animationDatas = that.data.animationDatas || [];
            if (animationDatas.length < 1) return
            for (let i = 0; i < animationDatas.length; i++) {
                setTimeout(function() {
                    let anobj = that.animatobj(i)
                    that.donghua(anobj)
                }, 450 * i)
            }
        },
        hide() {
            let that = this;
            let animationDatas = that.data.animationDatas;
            for (let i = 0; i < animationDatas.length; i++) {
                clearTimeout(animationDatas[i]['setim']);
            }
            that.setData({
                stop: true
            })
        }
    },
    methods: {
        animatobj(idx) {
            let that = this;
            let size = 30;
            let windowWidth = this.data.windowWidth
            let windowHeight = this.data.windowHeight
            if (!windowWidth) {
                wx.getSystemInfo({
                    success(res) {
                        that.setData({
                            windowWidth: res.windowWidth + size,
                            windowHeight: res.windowHeight
                        })
                    }
                })
                windowWidth = 600
            }
            let dura = Math.floor(Math.random() * 4050 + 3000)
            let left = Math.floor(Math.random() * windowWidth)
            let scale = (Math.random() - 0.5) * 2 + 1.2
            let rotate = (Math.random() - 0.5) * 2 * 180
            let key = 'animationDatas[' + idx + ']'
            return {
                dura: dura,
                left: left,
                scale: scale,
                rotate: rotate,
                key: key,
                windowHeight: windowHeight + size,
                idx: idx
            }
        },
        donghua: function(aniobj) {
            let that = this;
            console.log(aniobj)

            let animation = wx.createAnimation({})
            animation.opacity(0).translateY(0).step({
                duration: 10
            })
            animation.opacity(1).scale(aniobj.scale).step({
                duration: 0
            })
            animation.translateY(aniobj.windowHeight).left(aniobj.left).rotate(aniobj.rotate).scale(aniobj.scale).step({
                duration: aniobj.dura
            })
            // animation.translateY(0).step({
            //     duration: 10
            // })


            // let animation = wx.createAnimation({})
            // animation.opacity(0).translateY(0).step({
            //     duration: 10
            // })
            // animation.opacity(1).scale(aniobj.scale).step({
            //     duration: 0
            // })
            // animation.translateY(aniobj.windowHeight).left(aniobj.left).rotate(aniobj.rotate).scale(aniobj.scale).step({
            //     duration: aniobj.dura
            // })
            // animation.opacity(0).step({
            //     duration: 10
            // })
            // animation.translateY(0).step({
            //     duration: 10
            // })
            let dobj = {}
            dobj[aniobj.key] = {}
            dobj[aniobj.key]['animt'] = animation.export()
            let animationDatas = that.data.animationDatas;
            if (that.data.stop) return;
            dobj[aniobj.key]['setim'] = setTimeout(function() {
                clearTimeout(animationDatas[aniobj.idx]['setim']);
                let anobj = that.animatobj(aniobj.idx)
                that.donghua(anobj)
            }, aniobj.dura);
            that.setData(dobj);
        }
    }
})