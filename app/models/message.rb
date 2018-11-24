class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

 # メッセージを送信する際、contentとimageがない場合にデータを保存させない構文
  validates :content, presence: true, unless: :image?
  # messageのimageカラムと今回作成したimage_uploaderを紐づける記述
  mount_uploader :image, ImageUploader
end
