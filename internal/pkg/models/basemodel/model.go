package basemodel

import (
	"time"
)

type Model struct {
	ID        uint64    `gorm:"column:id;primary_key;auto_increment;" json:"id" form:"id"`                  // 主键
	CreatedAt time.Time `gorm:"column:tm_create;type:datetime;not null;" json:"tm_create" form:"tm_create"` // 创建时间
	UpdatedAt time.Time `gorm:"column:tm_update;type:datetime;not null;" json:"tm_update" form:"tm_update"` // 更新时间
	CreatedBy uint64    `gorm:"column:created_by;default:0;not null;" json:"created_by" form:"created_by"`  // 创建人
	UpdatedBy uint64    `gorm:"column:updated_by;default:0;not null;" json:"updated_by" form:"updated_by"`  // 更新人
}

func GetTablePrefix() string {
	return "casb_"
}
