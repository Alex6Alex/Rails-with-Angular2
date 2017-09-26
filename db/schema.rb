# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170402172207) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'atc_groups',  force: :cascade do |t|
    t.string   'code',        limit: 1, null: false
    t.text     'description',           null: false
    t.datetime 'created_at',            null: false
    t.datetime 'updated_at',            null: false
  end

  create_table 'atc_sub_groups',  force: :cascade do |t|
    t.string   'code',            limit: 3, null: false
    t.text     'description',               null: false
    t.datetime 'created_at',                null: false
    t.datetime 'updated_at',                null: false
    t.integer  'atc_group_id'
  end

  create_table 'medicines', force: :cascade do |t|
    t.string   'name',      limit: 25,  null: false
    t.string   'form',      limit: 20,  null: false
    t.string   'package'
    t.text     'comment'
    t.datetime 'created_at',            null: false
    t.datetime 'updated_at',            null: false
    t.integer  'atc_sub_group_id'
  end

  create_table 'pharmacies',  force: :cascade do |t|
    t.string   'name',        limit: 25,  null: false
    t.string   'address',     limit: 40,  null: false
    t.string   'phone',       limit: 20,  null: false
    t.string   'worktime',    limit: 20,  null: false
    t.datetime 'created_at',              null: false
    t.datetime 'updated_at',              null: false
    t.string   'area',  limit: 25,  null: false
  end

  create_table 'price_lists', force: :cascade do |t|
    t.integer  'medicine_id'
    t.integer  'pharmacy_id'
    t.decimal  'price', precision: 8, scale: 2, null: false
    t.integer  'count',                         null: false
    t.datetime 'created_at',                    null: false
    t.datetime 'updated_at',                    null: false
  end

  create_table 'reservations', force: :cascade do |t|
    t.integer  'user_id'
    t.integer  'price_list_id'
    t.datetime 'created_at',    null: false
    t.datetime 'updated_at',    null: false
  end

  create_table 'users', force: :cascade do |t|
    t.string   'name',            limit: 25,  null: false
    t.string   'email',           limit: 25,  null: false
    t.datetime 'created_at',                  null: false
    t.datetime 'updated_at',                  null: false
    t.string   'password_digest'
    t.string   'remember_token'
    t.string   'phone',           limit: 16, null: false
    t.boolean  'admin',           default: false
    t.index ['email'],            name: 'index_users_on_email', unique: true, using: :btree
    t.index ['remember_token'],   name: 'index_users_on_remember_token',  using: :btree
  end
end
