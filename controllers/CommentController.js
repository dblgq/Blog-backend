import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

// Создание комментария
export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      user: req.userId, // предполагается, что идентификатор пользователя хранится в req.userId после аутентификации
      post: req.body.postId,
    });

    const comment = await doc.save();

    await PostModel.findByIdAndUpdate(req.body.postId, {
      $inc: { commentsCount: 1 },
    });

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарий",
    });
  }
};

// Удаление комментария
export const remove = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId; // Предполагается, что userId берется из middleware `checkAuth`

    // Ищем комментарий, чтобы убедиться, что он существует и принадлежит текущему пользователю
    const comment = await CommentModel.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this comment",
      });
    }

    // Удаляем комментарий
    await CommentModel.deleteOne({ _id: commentId });

    // Уменьшаем счетчик комментариев в посте
    await PostModel.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete comment",
    });
  }
};

// Получение комментариев для поста
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await CommentModel.find({ post: req.params.id })
      .populate("user")
      .exec();

    const commentsWithCounts = comments.map((comment) => ({
      ...comment.toObject(),
      likesCount: comment.likes.length,
      dislikesCount: comment.dislikes.length,
    }));

    res.json(commentsWithCounts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

// отобразить, кто поставил лайк или дизлайк
export const listOflikes = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id).populate(
      "likes dislikes"
    );
    if (!comment) {
      return res.status(404).json({
        message: "Комментарий не найден",
      });
    }
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарий",
    });
  }
};

// Лайк/дизлайк комментария
export const likeComment = async (req, res) => {
  try {
    const userId = req.userId; // ID пользователя, который выполняет действие
    const comment = await CommentModel.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Комментарий не найден",
      });
    }

    // Если действие - "лайк"
    if (req.body.action === "like") {
      if (comment.likes.includes(userId)) {
        comment.likes.pull(userId); // Убираем лайк
      } else {
        comment.likes.push(userId); // Добавляем лайк
        comment.dislikes.pull(userId); // Убираем дизлайк, если он был
      }
    }

    // Если действие - "дизлайк"
    if (req.body.action === "dislike") {
      if (comment.dislikes.includes(userId)) {
        comment.dislikes.pull(userId); // Убираем дизлайк
      } else {
        comment.dislikes.push(userId); // Добавляем дизлайк
        comment.likes.pull(userId); // Убираем лайк, если он был
      }
    }

    const updatedComment = await comment.save();

    // Возвращаем обновленный комментарий с количеством лайков и дизлайков
    res.json({
      ...updatedComment.toObject(),
      likesCount: updatedComment.likes.length,
      dislikesCount: updatedComment.dislikes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось изменить комментарий",
    });
  }
};
