import {
    pgTable,
    varchar,
    serial,
    timestamp,
    text,
    integer
}
    from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm"


export const players = pgTable("players", {
    id: serial("id").primaryKey(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 50 }).notNull(),
    photo: text(),
    teamId: integer("team_id").references(
        () => teams.id,
        {
            onDelete: "set null",
        }
    ),
    refreshToken: text(),
    createdAt: timestamp("created_at").defaultNow()
})


export const owners = pgTable("owners", {
    id: serial("id").primaryKey(),
    name: varchar({ length: 250 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
})


export const teams = pgTable("teams", {
    id: serial("id").primaryKey(),
    teamName: varchar({ length: 100 }).notNull(),
    ownerId: integer("owner_id").references(
        () => owners.id
    ),
})

export const sponsers = pgTable("sponsers", {
    id: serial("id").primaryKey(),
    sponserName: varchar({length: 255}).notNull()
})


export const teamSponsers = pgTable("team_sponsers", {
    id: serial("id").primaryKey(),

    teamId: integer("team_id").references(
        () => teams.id
    ),

    sponserId: integer("sponser_id").references(
        () => sponsers.id

    )
})





export const ownerRelations = relations(
    owners,
    ({ many }) => ({
        teams: many(teams)
    })
)

export const teamRelations = relations(
    teams,
    ({one, many})=>({
        owner: one(owners, {
            fields:[
                teams.ownerId
            ],

            references:[
                owners.id
            ]
        }),


        players: many(players)
    })
)


export const playerRelations = relations(
    players, 
    ({one}) =>({
        team: one(teams, {
            fields:[
                players.teamId
            ],
            references:[
                teams.id
            ]
        })
    })
)
