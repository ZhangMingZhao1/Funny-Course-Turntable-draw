import TweenLite from 'TweenLite'
import 'CSSPlugin'

// var gift=new Array("再答一题","谢谢参与","U盘的一半","阳光100一日游上","阳光100一日游下","指定一名同学答题","场外求助一次","U盘的另一半"）

class Turntable {
	constructor(container2, config) {
		var turnsCount = config.turnsCount

		this.pointer = config.pointer || ''
		this.container2 = this.pointer || container2
		this.ANGLE = 360 / turnsCount	// 计算角度
		this.INIT_TIME = 8	// 初始旋转时间
		this.ROTATION = 3600	// 初始旋转角度
		this.NOW_ROTATION = 0	// 已经旋转角度
	}

	action(time, rotation, onComplete) {
		var container2 = this.container2
		var self = this

		TweenLite.to(container2, time, {
			rotation: rotation,
			onUpdate: function() {
				self.NOW_ROTATION = Math.floor(this.ratio * self.ROTATION)
			},
			onComplete
		})
	}

	reset() {
		this.NOW_ROTATION = 0
		TweenLite.set(this.container2, {rotation: 0})
	}

	/**
	 * 根据中奖奖品的 index 得到最后指针停留的位置
	**/
	getRotation(index) {
		var nowRotation = this.NOW_ROTATION
		var angle = this.ANGLE
		var disRotation = this.pointer ? index * angle : -index * angle

		return 360 * (Math.floor(nowRotation / 360) + 5) + disRotation
	}

	done(index, fn) {
		var rotation = this.getRotation(index)

		this.action(4, rotation, fn)
	}

	run() {
		this.reset()

		this.action(this.INIT_TIME, this.ROTATION)
	}

}

export default Turntable
