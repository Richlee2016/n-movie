
/* 
电影分类分组
*/
module.exports = app => {
    const mongoose = app.mongoose;
    
    const GroupSchema = new mongoose.Schema({
      /**
       * Type
       * 1.热门
       * 2.最新
       * 3.电视剧
       * 4.动漫
       * 5.专题
       */
      Type:Number,
      Name:String,
      Describe:String,
      Group:[{ type:Number, ref: "t_movie_home" }],
      meta: {
        createAt: {
          type: Date,
          default: Date.now()
        },
        updateAt: {
          type: Date,
          default: Date.now()
        }
      }
    });
  
    GroupSchema.pre("save", function (next) {
      if (GroupSchema.isNew) {
        GroupSchema.meta.createAt = GroupSchema.meta.updateAt = Date.now();
      } else {
        GroupSchema.meta.updateAt = Date.now();
      }
      next();
    });
  
    return mongoose.model('t_movie_group', GroupSchema);
  }
  
  